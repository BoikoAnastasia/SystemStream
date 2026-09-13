import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../store/store';
import { UserProfileSlice } from '../store/slices/UserProfileSlice';
// utils
import { NotificationSlice } from '../store/slices/NotificationSlice';
import { ensureAccessToken, hasAuthSession, refreshAccessToken } from '../api/authSession';

const PROFILE_RETRY_MS = 3_000;
const ACCESS_REFRESH_INTERVAL_MS = 20 * 60 * 1000; // proactive refresh before ~30m access expiry

export const useAuthRestore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { UserLogout, SetAuth } = UserProfileSlice.actions;
  const { ClearNotification, NotificationFetchError } = NotificationSlice.actions;
  const hasSession = hasAuthSession();
  const [isLoading, setIsLoading] = useState(true);
  const [hasPendingRestore, setHasPendingRestore] = useState(hasSession);
  const lastProcessedSessionRef = useRef<boolean | null>(null);
  const restoreRequestIdRef = useRef(0);
  const finalizeTimeoutRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const proactiveRefreshRef = useRef<number | null>(null);

  useEffect(() => {
    if (lastProcessedSessionRef.current === hasSession) {
      return;
    }
    lastProcessedSessionRef.current = hasSession;

    if (finalizeTimeoutRef.current !== null) {
      window.clearTimeout(finalizeTimeoutRef.current);
      finalizeTimeoutRef.current = null;
    }
    if (retryTimeoutRef.current !== null) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    if (!hasSession) {
      restoreRequestIdRef.current += 1;
      setHasPendingRestore(false);
      dispatch(UserLogout());
      dispatch(ClearNotification());
      setIsLoading(false);
      return;
    }

    const { userProfile } = require('../store/actions/UserActions') as typeof import('../store/actions/UserActions');
    const { notificationWithPagination } =
      require('../store/actions/NotificationActions') as typeof import('../store/actions/NotificationActions');
    const requestId = ++restoreRequestIdRef.current;

    setHasPendingRestore(true);
    setIsLoading(true);
    dispatch(SetAuth(true));

    const runRestore = async (attempt: number): Promise<void> => {
      const access = await ensureAccessToken();
      if (restoreRequestIdRef.current !== requestId) return;

      if (!access) {
        dispatch(UserLogout());
        dispatch(ClearNotification());
        setHasPendingRestore(false);
        setIsLoading(false);
        return;
      }

      const profileResult = await Promise.resolve(dispatch(userProfile()));
      if (restoreRequestIdRef.current !== requestId) return;

      if (!profileResult?.ok && !profileResult?.unauthorized && attempt < 5) {
        // Backend may still be starting after VM boot — retry without logging out.
        retryTimeoutRef.current = window.setTimeout(() => {
          void runRestore(attempt + 1);
        }, PROFILE_RETRY_MS);
        return;
      }

      if (profileResult?.unauthorized) {
        setHasPendingRestore(false);
        setIsLoading(false);
        return;
      }

      await Promise.resolve(dispatch(notificationWithPagination())).catch((error) => {
        dispatch(NotificationFetchError(error));
      });

      if (restoreRequestIdRef.current !== requestId) return;

      finalizeTimeoutRef.current = window.setTimeout(() => {
        if (restoreRequestIdRef.current === requestId) {
          setHasPendingRestore(false);
          setIsLoading(false);
        }
        finalizeTimeoutRef.current = null;
      }, 25);
    };

    void runRestore(0);
  }, [hasSession, dispatch, SetAuth, UserLogout, ClearNotification, NotificationFetchError]);

  // Keep access JWT fresh while the tab is open.
  useEffect(() => {
    if (!hasSession) {
      if (proactiveRefreshRef.current !== null) {
        window.clearInterval(proactiveRefreshRef.current);
        proactiveRefreshRef.current = null;
      }
      return;
    }

    proactiveRefreshRef.current = window.setInterval(() => {
      void refreshAccessToken();
    }, ACCESS_REFRESH_INTERVAL_MS);

    return () => {
      if (proactiveRefreshRef.current !== null) {
        window.clearInterval(proactiveRefreshRef.current);
        proactiveRefreshRef.current = null;
      }
    };
  }, [hasSession]);

  useEffect(
    () => () => {
      if (finalizeTimeoutRef.current !== null) {
        window.clearTimeout(finalizeTimeoutRef.current);
      }
      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current);
      }
    },
    []
  );

  return { isLoading: isLoading || hasPendingRestore };
};

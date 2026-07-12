import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { fetchLiveStreamsFromApi } from '../api/liveStreamsApi';
import { fetchtSubsribtionsMy } from '../store/actions/SubscribersActions';
import { useAppSelector } from '../hooks/redux';
import { IStreamOnline, ISubscriber } from '../types/share';
import { SIDEBAR_LIVE_FETCH_PAGE_SIZE } from '../components/sidebar/sidebar.constants';
import { getCookie } from '../utils/cookieFunctions';

const SIDEBAR_POLL_MS = 15_000;
const SUBS_POLL_MS = 60_000;

type SidebarPanelContextType = {
  streams: IStreamOnline[];
  streamsLoading: boolean;
  streamsError: boolean;
  subscribers: ISubscriber[];
  subsLoading: boolean;
  subsError: boolean;
  hasSession: boolean;
  refreshPanelData: () => void;
};

const SidebarPanelContext = createContext<SidebarPanelContextType | undefined>(undefined);

export const SidebarPanelProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth, data: profile } = useAppSelector((state) => state.user);
  const hasSession = Boolean(isAuth || profile?.id || getCookie('tokenData'));

  const [streams, setStreams] = useState<IStreamOnline[]>([]);
  const [streamsLoading, setStreamsLoading] = useState(true);
  const [streamsError, setStreamsError] = useState(false);
  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);
  const [subsError, setSubsError] = useState(false);
  const streamsLoadedRef = useRef(false);
  const subsLoadedRef = useRef(false);

  const refreshStreams = useCallback(async (silent = false) => {
    if (!silent) {
      setStreamsLoading(true);
    }

    const { data, error } = await fetchLiveStreamsFromApi(1, SIDEBAR_LIVE_FETCH_PAGE_SIZE);

    if (error || !data) {
      if (!silent || !streamsLoadedRef.current) {
        setStreamsError(true);
        setStreams([]);
      }
    } else {
      setStreams(data.streams);
      setStreamsError(false);
      streamsLoadedRef.current = true;
    }

    setStreamsLoading(false);
  }, []);

  const refreshSubscriptions = useCallback(async (silent = false) => {
    const token = getCookie('tokenData');
    if (!token) {
      setSubscribers([]);
      setSubsError(false);
      setSubsLoading(false);
      subsLoadedRef.current = false;
      return;
    }

    if (!silent) {
      setSubsLoading(true);
    }
    setSubsError(false);

    const users = await fetchtSubsribtionsMy();
    if (users === null) {
      if (!silent || !subsLoadedRef.current) {
        setSubsError(true);
        setSubscribers([]);
      }
    } else {
      setSubscribers(users);
      setSubsError(false);
      subsLoadedRef.current = true;
    }

    setSubsLoading(false);
  }, []);

  const refreshPanelData = useCallback(() => {
    void refreshStreams(false);
    void refreshSubscriptions(false);
  }, [refreshStreams, refreshSubscriptions]);

  useEffect(() => {
    void refreshStreams(false);
    const timer = window.setInterval(() => {
      void refreshStreams(true);
    }, SIDEBAR_POLL_MS);
    return () => window.clearInterval(timer);
  }, [refreshStreams]);

  useEffect(() => {
    if (!hasSession) {
      setSubscribers([]);
      setSubsError(false);
      setSubsLoading(false);
      subsLoadedRef.current = false;
      return;
    }

    void refreshSubscriptions(false);
    const timer = window.setInterval(() => {
      void refreshSubscriptions(true);
    }, SUBS_POLL_MS);

    return () => window.clearInterval(timer);
  }, [hasSession, profile?.id, refreshSubscriptions]);

  useEffect(() => {
    const onSubscriptionChanged = () => {
      void refreshSubscriptions(true);
    };

    window.addEventListener('stream-subscription-changed', onSubscriptionChanged);
    return () => window.removeEventListener('stream-subscription-changed', onSubscriptionChanged);
  }, [refreshSubscriptions]);

  const value = useMemo(
    () => ({
      streams,
      streamsLoading,
      streamsError,
      subscribers,
      subsLoading,
      subsError,
      hasSession,
      refreshPanelData,
    }),
    [streams, streamsLoading, streamsError, subscribers, subsLoading, subsError, hasSession, refreshPanelData]
  );

  return <SidebarPanelContext.Provider value={value}>{children}</SidebarPanelContext.Provider>;
};

export const useSidebarPanel = () => {
  const ctx = useContext(SidebarPanelContext);
  if (!ctx) throw new Error('useSidebarPanel must be used within SidebarPanelProvider');
  return ctx;
};

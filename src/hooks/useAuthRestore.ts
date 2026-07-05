import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../store/store';
import { userProfile } from '../store/actions/UserActions';
import { UserProfileSlice } from '../store/slices/UserProfileSlice';
// utils
import { getCookie } from '../utils/cookieFunctions';
import { NotificationSlice } from '../store/slices/NotificationSlice';
import { notificationWithPagination } from '../store/actions/NotificationActions';

export const useAuthRestore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { UserLogout, SetAuth } = UserProfileSlice.actions;
  const { ClearNotification, NotificationFetchError } = NotificationSlice.actions;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie('tokenData');

    if (!token) {
      dispatch(UserLogout());
      dispatch(ClearNotification());
      setIsLoading(false);
      return;
    }

    dispatch(SetAuth(true));
    dispatch(userProfile()).finally(() => setIsLoading(false));
    dispatch(notificationWithPagination())
      .catch((error) => {
        dispatch(NotificationFetchError(error));
      })
      .finally(() => setIsLoading(false));
  }, [ClearNotification, NotificationFetchError, SetAuth, UserLogout, dispatch]);

  return { isLoading };
};

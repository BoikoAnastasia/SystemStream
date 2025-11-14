import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../store/store';
import { userProfile } from '../store/actions/UserActions';
import { UserProfileSlice } from '../store/slices/UserProfileSlice';
// utils
import { getCookie } from '../utils/cookieFunctions';

export const useAuthRestore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { UserLogout, SetAuth } = UserProfileSlice.actions;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie('tokenData');

    if (!token) {
      dispatch(UserLogout());
      setIsLoading(false);
      return;
    }

    dispatch(SetAuth(true));

    dispatch(userProfile())
      .then(() => console.log('Профиль получен'))
      .catch(() => {
        dispatch(UserLogout()); // токен невалидный
      })
      .finally(() => setIsLoading(false));
  }, [SetAuth, UserLogout, dispatch]);

  return { isLoading };
};

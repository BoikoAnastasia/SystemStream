import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../store/store';
import { userProfile } from '../store/actions/UserActions';
// utils
import { getCookie } from '../utils/cookieFunctions';

export const useAuthRestore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = getCookie('tokenData');

    if (!token) {
      setIsLoading(false);
      setHasToken(false);
      return;
    }

    setHasToken(true);

    dispatch(userProfile()).finally(() => setIsLoading(false));
  }, [dispatch]);

  return { isLoading, hasToken };
};

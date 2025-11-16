import { getCookie } from './cookieFunctions';

export const createGuestKey = () => {
  let userToken = getCookie('tokenData');
  if (!userToken) {
    userToken = crypto.randomUUID();
    localStorage.setItem('viewerSessionId', userToken);
  }
  return userToken;
};

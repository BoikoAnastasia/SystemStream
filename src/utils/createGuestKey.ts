import { getCookie } from './cookieFunctions';

export const createGuestKey = () => {
  // Авторизованный пользователь
  const authToken = getCookie('tokenData');
  if (authToken) return authToken;

  // Гость
  let guestId = localStorage.getItem('viewerSessionId');
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem('viewerSessionId', guestId);
  }

  return guestId;
};

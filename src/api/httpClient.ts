import { createGuestKey } from '../utils/createGuestKey';
import { getCookie, removeCookie } from '../utils/cookieFunctions';

export const getAuthToken = () => getCookie('tokenData') || createGuestKey();

export const authHeaders = (headers: HeadersInit = {}) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getAuthToken()}`,
  ...headers,
});

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const hadUserToken = Boolean(getCookie('tokenData'));
  const response = await fetch(url, {
    ...options,
    headers: authHeaders(options.headers),
  });

  if (response.status === 401 && hadUserToken) {
    removeCookie('tokenData');
    window.location.reload();
  }

  return response;
};

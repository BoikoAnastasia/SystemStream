import { createGuestKey } from '../utils/createGuestKey';
import { clearAuthTokens, COOKIE_AUTH, hasAuthSession, refreshAccessToken } from './authSession';

/**
 * Headers for authenticated/guest API calls.
 * Logged-in users rely on HttpOnly cookies — never put JWTs in Authorization.
 * Guests may send a non-secret viewer id as Bearer for chat/presence.
 */
export const sessionAuthHeaders = (headers: HeadersInit = {}): Record<string, string> => {
  const merged: Record<string, string> = {
    ...(headers as Record<string, string>),
  };

  if (!hasAuthSession() && !merged.Authorization) {
    merged.Authorization = `Bearer ${createGuestKey()}`;
  }

  return merged;
};

export const authHeaders = (headers: HeadersInit = {}) => ({
  'Content-Type': 'application/json',
  ...sessionAuthHeaders(headers),
});

/** @deprecated Prefer sessionAuthHeaders / authHeaders — JWTs are not readable. */
export const getAuthToken = () => (hasAuthSession() ? COOKIE_AUTH : createGuestKey());

const isAuthRefreshUrl = (url: string) => url.includes('/refresh') || url.includes('/login') || url.includes('/logout');

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const hadSession = hasAuthSession();
  const headers = options.body instanceof FormData ? sessionAuthHeaders(options.headers) : authHeaders(options.headers);

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (response.status !== 401 || !hadSession || isAuthRefreshUrl(url)) {
    return response;
  }

  const refreshed = await refreshAccessToken();
  if (!refreshed) {
    clearAuthTokens();
    window.location.reload();
    return response;
  }

  const retryHeaders =
    options.body instanceof FormData ? sessionAuthHeaders(options.headers) : authHeaders(options.headers);

  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: retryHeaders,
  });
};

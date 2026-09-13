import { getCookie, removeCookie } from '../utils/cookieFunctions';

/**
 * Non-HttpOnly marker set by the API (`sp_auth=1`).
 * Access/refresh JWTs live only in HttpOnly cookies (`sp_access` / `sp_refresh`) —
 * JavaScript must never read or write them.
 */
export const AUTH_SESSION_COOKIE = 'sp_auth';

/** Legacy SPA-origin cookies — cleared on migrate/logout. */
const LEGACY_ACCESS_COOKIE = 'tokenData';
const LEGACY_REFRESH_COOKIE = 'refreshToken';

/** Sentinel returned when auth is carried by HttpOnly cookies (not a real JWT). */
export const COOKIE_AUTH = 'cookie';

export const hasAuthSession = () => getCookie(AUTH_SESSION_COOKIE) === '1';

/** @deprecated Tokens are HttpOnly — always null for JS. Prefer hasAuthSession(). */
export const getAccessToken = (): string | null => null;

/** @deprecated Refresh is HttpOnly — always null for JS. */
export const getRefreshToken = (): string | null => null;

export const clearAuthTokens = () => {
  // Client can only clear the readable marker + legacy cookies.
  // HttpOnly cookies are cleared by POST /logout (Set-Cookie Max-Age=0).
  removeCookie(AUTH_SESSION_COOKIE);
  removeCookie(LEGACY_ACCESS_COOKIE);
  removeCookie(LEGACY_REFRESH_COOKIE);
};

/** Drop pre-HttpOnly SPA cookies without touching the server session marker. */
export const clearLegacyAuthCookies = () => {
  removeCookie(LEGACY_ACCESS_COOKIE);
  removeCookie(LEGACY_REFRESH_COOKIE);
};

let refreshInFlight: Promise<string | null> | null = null;

/**
 * Rotate auth cookies via POST /refresh (credentials).
 * Returns COOKIE_AUTH on success, null on definitive auth failure.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    if (!hasAuthSession()) return null;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_USER}/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          clearAuthTokens();
        }
        return null;
      }

      clearLegacyAuthCookies();
      return COOKIE_AUTH;
    } catch {
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
};

/** Ensure the browser has a usable auth session (cookie-backed). */
export const ensureAccessToken = async (): Promise<string | null> => {
  if (hasAuthSession()) return COOKIE_AUTH;
  return refreshAccessToken();
};

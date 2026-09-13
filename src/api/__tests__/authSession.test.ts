import {
  AUTH_SESSION_COOKIE,
  clearAuthTokens,
  clearLegacyAuthCookies,
  COOKIE_AUTH,
  ensureAccessToken,
  getAccessToken,
  getRefreshToken,
  hasAuthSession,
  refreshAccessToken,
} from '../authSession';

const mockGetCookie = jest.fn();
const mockRemoveCookie = jest.fn();

jest.mock('../../utils/cookieFunctions', () => ({
  getCookie: (...args: unknown[]) => mockGetCookie(...args),
  setCookie: jest.fn(),
  removeCookie: (...args: unknown[]) => mockRemoveCookie(...args),
}));

describe('authSession (HttpOnly cookie mode)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCookie.mockReturnValue(undefined);
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('getAccessToken and getRefreshToken never expose JWTs to JS', () => {
    mockGetCookie.mockReturnValue('should-not-matter');
    expect(getAccessToken()).toBeNull();
    expect(getRefreshToken()).toBeNull();
  });

  test('hasAuthSession is true only for sp_auth=1 marker', () => {
    mockGetCookie.mockImplementation((name: string) => (name === AUTH_SESSION_COOKIE ? '1' : undefined));
    expect(hasAuthSession()).toBe(true);

    mockGetCookie.mockReturnValue('0');
    expect(hasAuthSession()).toBe(false);
  });

  test('clearAuthTokens removes session marker and legacy cookies', () => {
    clearAuthTokens();
    expect(mockRemoveCookie).toHaveBeenCalledWith(AUTH_SESSION_COOKIE);
    expect(mockRemoveCookie).toHaveBeenCalledWith('tokenData');
    expect(mockRemoveCookie).toHaveBeenCalledWith('refreshToken');
  });

  test('clearLegacyAuthCookies does not remove session marker', () => {
    clearLegacyAuthCookies();
    expect(mockRemoveCookie).not.toHaveBeenCalledWith(AUTH_SESSION_COOKIE);
    expect(mockRemoveCookie).toHaveBeenCalledWith('tokenData');
    expect(mockRemoveCookie).toHaveBeenCalledWith('refreshToken');
  });

  test('refreshAccessToken uses credentials and clears session on 401', async () => {
    mockGetCookie.mockImplementation((name: string) => (name === AUTH_SESSION_COOKIE ? '1' : undefined));
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    const result = await refreshAccessToken();

    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/refresh'),
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      })
    );
    expect(mockRemoveCookie).toHaveBeenCalledWith(AUTH_SESSION_COOKIE);
  });

  test('refreshAccessToken keeps session on transient 500', async () => {
    mockGetCookie.mockImplementation((name: string) => (name === AUTH_SESSION_COOKIE ? '1' : undefined));
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    const result = await refreshAccessToken();

    expect(result).toBeNull();
    expect(mockRemoveCookie).not.toHaveBeenCalled();
  });

  test('refreshAccessToken returns cookie sentinel on success', async () => {
    mockGetCookie.mockImplementation((name: string) => (name === AUTH_SESSION_COOKIE ? '1' : undefined));
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ authenticated: true, expiresIn: 1800 }),
    }) as unknown as typeof fetch;

    await expect(refreshAccessToken()).resolves.toBe(COOKIE_AUTH);
  });

  test('concurrent refreshAccessToken shares one in-flight request', async () => {
    mockGetCookie.mockImplementation((name: string) => (name === AUTH_SESSION_COOKIE ? '1' : undefined));

    let resolveFetch: ((value: unknown) => void) | null = null;
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    ) as unknown as typeof fetch;

    const p1 = refreshAccessToken();
    const p2 = refreshAccessToken();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    resolveFetch!({
      ok: true,
      status: 200,
      json: async () => ({ authenticated: true }),
    });

    await expect(Promise.all([p1, p2])).resolves.toEqual([COOKIE_AUTH, COOKIE_AUTH]);
  });

  test('ensureAccessToken returns cookie sentinel when session marker exists', async () => {
    mockGetCookie.mockImplementation((name: string) => (name === AUTH_SESSION_COOKIE ? '1' : undefined));
    global.fetch = jest.fn() as unknown as typeof fetch;

    await expect(ensureAccessToken()).resolves.toBe(COOKIE_AUTH);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

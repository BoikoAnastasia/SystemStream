import { AUTH_SESSION_COOKIE, COOKIE_AUTH, getAccessToken, hasAuthSession } from '../authSession';

const mockGetCookie = jest.fn();

jest.mock('../../utils/cookieFunctions', () => ({
  getCookie: (...args: unknown[]) => mockGetCookie(...args),
  setCookie: jest.fn(),
  removeCookie: jest.fn(),
}));

describe('authSession security invariants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCookie.mockReturnValue(undefined);
  });

  test('COOKIE_AUTH sentinel marks HttpOnly cookie mode', () => {
    expect(COOKIE_AUTH).toBe('cookie');
  });

  test('even with forged cookie names, JWTs are never readable via getAccessToken', () => {
    mockGetCookie.mockImplementation((name: string) => {
      if (name === 'sp_access' || name === 'tokenData' || name === 'accessToken') {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.sig';
      }
      if (name === AUTH_SESSION_COOKIE) return '1';
      return undefined;
    });

    expect(getAccessToken()).toBeNull();
    expect(hasAuthSession()).toBe(true);
  });
});

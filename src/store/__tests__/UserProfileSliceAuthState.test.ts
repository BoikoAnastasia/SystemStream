import UserProfileReducer, { UserProfileSlice } from '../slices/UserProfileSlice';

describe('UserProfileSlice auth state', () => {
  test('UserFetchError keeps isAuth so transient errors do not look like logout', () => {
    const initState = UserProfileReducer(undefined as any, { type: '@@INIT' } as any);

    const afterAuth = UserProfileReducer(initState, UserProfileSlice.actions.SetAuth(true));
    const afterError = UserProfileReducer(afterAuth, UserProfileSlice.actions.UserFetchError('network error'));

    expect(afterError.isAuth).toBe(true);
    expect(afterError.isError).toBe('network error');
  });
});

// store, slices
import { AppDispatch } from '../store';
import { UserProfileSlice } from '../slices/UserProfileSlice';
import { SelectUserSlice } from '../slices/SelectUserSlice';
// utils
import { getCookie, removeCookie, setCookie } from '../../utils/cookieFunctions';
import { handleApiRequest } from '../../utils/handleApiRequest';
import { mapUserProfileFromApi } from '../../utils/mapUserProfile';

const { UserFetch, UserFetchError, UserFetchSuccess, UserLogout } = UserProfileSlice.actions;
const { SelectUserFetch, SelectUserError, SelectUserFetchSuccess, Clear } = SelectUserSlice.actions;
export type LoginResult = { ok: true } | { ok: false; status: number; message?: string };

// user
export const loginUser = async ({
  loginOrEmail,
  password,
}: {
  loginOrEmail: string;
  password: string;
}): Promise<LoginResult> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_USER}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginOrEmail: loginOrEmail, password: password }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => null);
      const message = err?.message || response.statusText;
      console.error('Ошибка авторизации:', message);
      return { ok: false, status: response.status, message };
    }
    const data = await response.json();
    if (!data.token) {
      console.error('Токен не получен');
      return { ok: false, status: response.status, message: 'Токен не получен' };
    }
    setCookie('tokenData', data.token, 1);
    return { ok: true };
  } catch (error: any) {
    console.error(error.message);
    return { ok: false, status: 0, message: error.message };
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    removeCookie('tokenData');
    dispatch(UserLogout());
    dispatch(Clear());
    console.log('Пользователь успешно вышел');
  } catch (error) {
    console.error('Ошибка при выходе: ', error);
  }
};

export const registrationUser = async (username: string, email: string, password: string) => {
  return handleApiRequest(`${process.env.REACT_APP_API_USER}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname: username, email: email, password: password }),
  });
};

// profile
export const userProfile = () => async (dispatch: AppDispatch) => {
  const token = getCookie('tokenData');
  if (!token) {
    dispatch(UserLogout());
    return { ok: false, unauthorized: true };
  }

  try {
    dispatch(UserFetch());
    const response = await fetch(`${process.env.REACT_APP_API_USER}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      removeCookie('tokenData');
      dispatch(UserLogout());
      return { ok: false, unauthorized: true };
    }

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      dispatch(UserFetchError(message || `Ошибка сервера (${response.status})`));
      return { ok: false, unauthorized: false };
    }

    const data = mapUserProfileFromApi(await response.json());
    dispatch(UserFetchSuccess(data));
    return { ok: true, payload: data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Сеть недоступна';
    dispatch(UserFetchError(message));
    return { ok: false, unauthorized: false };
  }
};

// fecthUserByNickname
export const fetchUserByNickname = (nickname: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SelectUserFetch());
    const response = await fetch(`${process.env.REACT_APP_API_USER}/by-nickname/${nickname}`);
    if (!response.ok) {
      if (response.status === 404) {
        return dispatch(SelectUserError('NOT_FOUND'));
      }
      const error = await response.json();
      console.error('Ошибка авторизации:', error.message || response.statusText);
      return dispatch(SelectUserError(error.message || 'ERROR'));
    }
    const data = mapUserProfileFromApi(await response.json());
    if (!data || Object.keys(data).length === 0) {
      return dispatch(SelectUserError('NOT_FOUND'));
    }

    return dispatch(SelectUserFetchSuccess(data));
  } catch (error: any) {
    return dispatch(SelectUserError(error.message || 'ERROR'));
  }
};

export const fetchUserById = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SelectUserFetch());
    const response = await fetch(`${process.env.REACT_APP_API_USER}/public-profile-id?userId=${id}`);
    if (!response.ok) {
      const error = await response.json();
      console.error('Ошибка авторизации:', error.message || response.statusText);
    }
    const data = mapUserProfileFromApi(await response.json());
    return dispatch(SelectUserFetchSuccess(data));
  } catch (error) {
    return dispatch(SelectUserError(error));
  }
};

// проверки для регистрации
export const checkExistEmail = async (email: string) => {
  return handleApiRequest<{ exists: boolean }>(`${process.env.REACT_APP_API_USER}/exists/email/${email}`);
};

export const checkExistNickname = async (nickname: string) => {
  return handleApiRequest<{ exists: boolean }>(`${process.env.REACT_APP_API_USER}/exists/nickname/${nickname}`);
};

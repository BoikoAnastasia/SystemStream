// store, slices
import { AppDispatch } from '../store';
import { UserProfileSlice } from '../slices/UserProfileSlice';
import { SelectUserSlice } from '../slices/SelectUserSlice';
// utils
import { getCookie, removeCookie, setCookie } from '../../utils/cookieFunctions';
import { handleApiRequest } from '../../utils/handleApiRequest';

const { UserFetch, UserFetchError, UserFetchSuccess, UserLogout } = UserProfileSlice.actions;
const { SelectUserFetch, SelectUserError, SelectUserFetchSuccess, Clear } = SelectUserSlice.actions;
// user
export const loginUser = async ({ loginOrEmail, password }: { loginOrEmail: string; password: string }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_USER}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginOrEmail: loginOrEmail, password: password }),
    });
    if (!response.ok) {
      const err = await response.json();
      console.error('Ошибка авторизации:', err.message || response.statusText);
      return false;
    }
    const data = await response.json();
    if (!data.token) {
      console.error('Токен не получен');
      return false;
    }
    setCookie('tokenData', data.token, 30);
    return true;
  } catch (error: any) {
    console.error(error.message);
    return false;
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
  try {
    dispatch(UserFetch());
    const token = getCookie('tokenData');
    const response = await fetch(`${process.env.REACT_APP_API_USER}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(UserFetchSuccess(data));
    return { payload: data };
  } catch (error) {
    dispatch(UserFetchError(error));
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
    const data = await response.json();
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
    const data = await response.json();
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

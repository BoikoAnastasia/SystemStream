import { UserProfileSlice } from '../slices/UserProfileSlice';
import { getCookie, removeCookie, setCookie } from '../../utils/cookieFunctions';
import { AppDispatch } from '../store';
import { SelectUserSlice } from '../slices/SelectUserSlice';

const { UserFetch, UserFetchError, UserFetchSuccess, UserLogout } = UserProfileSlice.actions;
const { SelectUserFetch, SelectUserError, SelectUserFetchSuccess } = SelectUserSlice.actions;
// user
export const loginUser = async ({ emailOrUsername, password }: { emailOrUsername: string; password: string }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_USER}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: emailOrUsername, Password: password }),
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
    setCookie('tokenData', data.token, 14);
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
    console.log('Пользователь успешно вышел');
  } catch (error) {
    console.error('Ошибка при выходе: ', error);
  }
};

export const registrationUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_USER}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Nickname: username, Email: email, Password: password }),
    });
    console.log('response: ', response);
    if (!response.ok) {
      console.log('response.json: ', response);
      const errorData = await response.json();
      console.log('errorData: ', errorData);
      return { success: false, message: errorData.message || `Ошибка: ${response.status}` };
    }
    const result = await response.json();
    console.log('result: ', result);
    return { success: true, data: result };
  } catch (e: any) {
    return { success: false, message: e.message || 'Ошибка регистрации' };
  }
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
    const response = await fetch(`${process.env.REACT_APP_API_USER}/public-profile-nickname?nickname=${nickname}`);
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

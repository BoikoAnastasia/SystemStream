import { UserProfileSlice } from '../../features/UserProfileSlice';
import { getCookie, removeCookie, setCookie } from '../../utils/cookieFunctions';
import { AppDispatch } from '../store';

const { UserFetch, UserFetchError, UserFetchSuccess, UserLogout } = UserProfileSlice.actions;
// user
export const loginUser = async ({ emailOrUsername, password }: { emailOrUsername: string; password: string }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Nickname: username, Email: email, Password: password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || `Ошибка: ${response.status}` };
    }
    const result = await response.json();
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return dispatch(UserFetchSuccess(data));
  } catch (error) {
    dispatch(UserFetchError(error));
  }
};

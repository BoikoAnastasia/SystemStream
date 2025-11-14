// store, slices
import { AppDispatch } from '../store';
import { UserProfileSlice } from '../slices/UserProfileSlice';
import { SelectUserSlice } from '../slices/SelectUserSlice';
// utils
import { getCookie, removeCookie, setCookie } from '../../utils/cookieFunctions';

const { UserFetch, UserFetchError, UserFetchSuccess, UserLogout } = UserProfileSlice.actions;
const { SelectUserFetch, SelectUserError, SelectUserFetchSuccess, Clear } = SelectUserSlice.actions;
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

// subscribers
export const fetchtSubsribtionsById = async (id: number) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_USER}/${id}/subscriptions`);
    if (!response.ok) {
      console.error('Ошибка получения подписчиков', response.statusText);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('не удалось получить подписчиков');
    return [];
  }
};

export const subscribeToUser = async (id: number) => {
  try {
    const token = getCookie('tokenData');
    const response = await fetch(`${process.env.REACT_APP_API_USER}/subscribe/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ targetUserId: id }),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Ошибка подписки на пользователя:', error.message || response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('не удалось подписаться');
    return error;
  }
};

export const deleteSubscribe = async (id: number) => {
  try {
    const token = getCookie('tokenData');
    const response = await fetch(`${process.env.REACT_APP_API_USER}/unsubscribe/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Ошибка отписки от пользователя:', error.message || response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('не удалось отписаться');
    return error;
  }
};

// is-subscribed
export const isSubscribed = async (id: number) => {
  try {
    const token = getCookie('tokenData');
    if (!token) return;
    const response = await fetch(`${process.env.REACT_APP_API_USER}/is-subscribed/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Ошибка подписчик ли:', error.message || response.statusText);
    }
    const data = await response.json();
    return Boolean(data);
  } catch (error) {
    console.log('не удалось получить подписчик ли');
    return false;
  }
};

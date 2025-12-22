import { AppDispatch } from '../store';
// actions, utils
import { userProfile } from './UserActions';
import { getCookie } from '../../utils/cookieFunctions';
// types
import { handleApiRequest } from '../../utils/handleApiRequest';
import { SettingsSlice } from '../slices/SettingsSlice';

const { SettingsSliceFetch, SettingsSliceError, SettingsSliceSuccess } = SettingsSlice.actions;

export const changeProfileData = (data: FormData) => async (dispatch: AppDispatch) => {
  const token = getCookie('tokenData');
  if (!token) return { success: false, message: 'Вы не авторизованы' };
  return handleApiRequest(
    `${process.env.REACT_APP_API_SETTINGS}/profile`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    },
    dispatch,
    () => dispatch(userProfile())
  );
};

export const postStreamKey = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(SettingsSliceFetch());
    const token = getCookie('tokenData');
    if (!token) return;
    const response = await fetch(`${process.env.REACT_APP_API_SETTINGS}/streamKey`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      console.error('Не удалось изменить ключ:', error.message || response.statusText);
    }

    const data = await response.json();
    dispatch(SettingsSliceSuccess(data));
  } catch (error: any) {
    dispatch(SettingsSliceError(error.message || 'Не удалось поменять ключ'));
  }
};

// update stream info
export const updateCurrentStream = async (values: FormData) => {
  const token = getCookie('tokenData');
  if (!token) return { success: false, message: 'Вы не авторизованы' };
  return handleApiRequest(`${process.env.REACT_APP_API_SETTINGS}/stream`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: values,
  });
};

// get category
export const fetchCategory = async (search?: string) => {
  const token = getCookie('tokenData');
  if (!token) return { success: false, message: 'Вы не авторизованы' };

  const url = search
    ? `${process.env.REACT_APP_API_SETTINGS}/categories?search=${encodeURIComponent(search)}&page=1&pageSize=20`
    : `${process.env.REACT_APP_API_SETTINGS}//categories?page=1&pageSize=20`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('fetchCategory', response);

    if (!response.ok) {
      const text = await response.text(); // читаем HTML или текст ошибки
      return { success: false, message: `Ошибка сервера ${response.status}: ${text}`, code: response.status };
    }

    const data = await response.json(); // безопасно читаем JSON
    return { success: true, data, message: 'OK', code: response.status };
  } catch (error: any) {
    return { success: false, message: error.message || 'Неизвестная ошибка' };
  }
};

//  "page": 1,
//   "pageSize": 20,
//   "totalCategories": 0,
//   "categories": [
// "Name", "Type", "Description", "Slug", "BannerImageUrl"]

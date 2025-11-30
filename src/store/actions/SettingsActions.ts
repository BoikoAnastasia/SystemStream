import { AppDispatch } from '../store';
// actions, utils
import { userProfile } from './UserActions';
import { getCookie } from '../../utils/cookieFunctions';
// types
import { IProfileChange } from '../../types/share';

export const changeProfileData = (data: IProfileChange) => async (dispatch: AppDispatch) => {
  try {
    const token = getCookie('tokenData');
    if (!token) return;

    const response = await fetch(`${process.env.REACT_APP_API_USER}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      return {
        success: false,
        message: errData?.message || `Ошибка ${response.status}: ${response.statusText}`,
      };
    }

    const resData = await response.json();
    await dispatch(userProfile());
    return { success: true, message: resData.message || 'Профиль успешно обновлен', data: resData };
  } catch (error: any) {
    return { success: false, message: error.message || 'Произошла ошибка при подключении к серверу' };
  }
};

export const settingProfileImage = (image: File) => async (dispatch: AppDispatch) => {
  const token = getCookie('tokenData');
  if (!token || !image) return;
  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    const response = await fetch(`${process.env.REACT_APP_API_USER}/upload/profile-image`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errData = await response.json();
      return errData;
    }
    const data = await response.json();
    console.log(data);
    await dispatch(userProfile());
    return { success: true, message: 'Профиль успешно обновлен', data: data };
  } catch (error) {
    console.log('Не удалось загрузить новое изображение профиля', error);
  }
};

export const settingBackgroundImage = (image: File) => async (dispatch: AppDispatch) => {
  const token = getCookie('tokenData');
  if (!token || !image) return;
  const formData = new FormData();
  formData.append('file', image);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_USER}/upload/background-image`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errData = await response.json();
      return errData;
    }
    const data = await response.json();
    await dispatch(userProfile());
    return { success: true, message: 'Профиль успешно обновлен', data: data };
  } catch (error) {
    console.log('Не удалось загрузить новое изображение профиля', error);
  }
};

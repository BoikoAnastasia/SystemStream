import { AppDispatch } from '../store';
// actions, utils
import { userProfile } from './UserActions';
import { getCookie } from '../../utils/cookieFunctions';
import { fileToBase64 } from '../../utils/fileToBase64';
// types
import { IProfileChange } from '../../types/share';

export const changeProfileData = (data: IProfileChange) => async (dispatch: AppDispatch) => {
  try {
    const token = getCookie('tokenData');
    if (!token) return { success: false, message: 'Токен не найден' };

    const payload: any = {};

    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined && value !== '') {
        if ((key === 'profileImage' || key === 'backgroundImage') && value instanceof File) {
          payload[key] = await fileToBase64(value);
        } else {
          payload[key] = value;
        }
      }
    }

    if (Object.keys(payload).length === 0) return { success: false, message: 'Нет данных для обновления' };

    const response = await fetch(`${process.env.REACT_APP_API_USER}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
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

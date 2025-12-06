import { AppDispatch } from '../store';
// actions, utils
import { userProfile } from './UserActions';
import { getCookie } from '../../utils/cookieFunctions';
// types
import { IProfileChange } from '../../types/share';
import { handleApiRequest } from '../../utils/handleApiRequest';

export const changeProfileData = (data: IProfileChange) => async (dispatch: AppDispatch) => {
  const token = getCookie('tokenData');
  if (!token) return { success: false, message: 'Вы не авторизованы' };
  return handleApiRequest(
    `${process.env.REACT_APP_API_USER}/profile`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
    dispatch,
    () => dispatch(userProfile())
  );
};

export const settingProfileImage = (image: File) => async (dispatch: AppDispatch) => {
  const token = getCookie('tokenData');
  if (!token) return { success: false, message: 'Вы не авторизованы' };
  if (!image) return { success: false, message: 'Изображение не загружено' };

  const formData = new FormData();
  formData.append('file', image);

  return handleApiRequest(
    `${process.env.REACT_APP_API_USER}/upload/profile-image`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: formData,
    },
    dispatch,
    () => dispatch(userProfile())
  );
};

export const settingBackgroundImage = (image: File) => async (dispatch: AppDispatch) => {
  const token = getCookie('tokenData');
  if (!token) return { success: false, message: 'Вы не авторизованы' };
  if (!image) return { success: false, message: 'Изображение не загружено' };

  const formData = new FormData();
  formData.append('file', image);
  return handleApiRequest(
    `${process.env.REACT_APP_API_USER}/upload/background-image`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: formData,
    },
    dispatch,
    () => dispatch(userProfile())
  );
};

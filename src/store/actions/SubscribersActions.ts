import { getCookie } from '../../utils/cookieFunctions';
import { createGuestKey } from '../../utils/createGuestKey';

// получить список подписок пользователя
export const fetchtSubsribtionsById = async (id: number) => {
  try {
    const token = getCookie('tokenData');
    const response = await fetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/me/following`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
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

// подписаться на пользователя
export const subscribeToUser = async (id: number) => {
  try {
    const token = getCookie('tokenData');
    const response = await fetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/follow/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

// отписаться на пользователя
export const deleteSubscribe = async (id: number) => {
  try {
    const token = getCookie('tokenData');
    const response = await fetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/unfollow/${id}`, {
      method: 'POST',
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

// список подписчиков пользователя (авторизованный или гостевой ключ)
export const streamerFolows = async (id: number) => {
  try {
    const token = createGuestKey();
    if (!token) return;
    const response = await fetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/${id}/subscribers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Не удалось получить подписчиков:', error.message || response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Не удалось получить подписчиков');
    return error;
  }
};

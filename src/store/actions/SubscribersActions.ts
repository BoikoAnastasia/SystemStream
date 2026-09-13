import { ensureAccessToken, hasAuthSession } from '../../api/authSession';
import { apiFetch } from '../../api/httpClient';
import { ISubscriber } from '../../types/share';
import { normalizeSubscriber } from './StreamsActions';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';

const mapSubscription = (raw: Record<string, unknown>): ISubscriber => {
  const item = normalizeSubscriber(raw);
  return {
    ...item,
    profileImage: resolveMediaUrl(item.profileImage),
    previewUrl: resolveMediaUrl(item.previewUrl),
  };
};

// получить список подписок пользователя
export const fetchtSubsribtionsMy = async (): Promise<ISubscriber[] | null> => {
  try {
    if (!hasAuthSession()) return [];

    const response = await apiFetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/me/following`);
    if (!response.ok) {
      console.error('Ошибка получения подписок', response.statusText);
      return null;
    }
    const data = await response.json();
    const items = Array.isArray(data) ? data : (data?.items ?? data?.Items ?? []);
    if (!Array.isArray(items)) return [];
    return items.map((item: Record<string, unknown>) => mapSubscription(item));
  } catch (error) {
    console.log('не удалось получить подписчиков');
    return null;
  }
};

// подписаться на пользователя
export const subscribeToUser = async (id: number) => {
  try {
    const token = await ensureAccessToken();
    if (!token) return;
    const response = await apiFetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/follow/${id}`, {
      method: 'POST',
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
    const token = await ensureAccessToken();
    if (!token) return;
    const response = await apiFetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/unfollow/${id}`, {
      method: 'POST',
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
    const response = await apiFetch(`${process.env.REACT_APP_API_SUBSCRIPTIONS}/${id}/subscribers`, {
      method: 'GET',
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

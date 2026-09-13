import { ensureAccessToken } from '../../api/authSession';
import { apiFetch } from '../../api/httpClient';
import { AppDispatch, RootState } from '../store';
import {
  NotificationFetch,
  NotificationFetchSuccess,
  NotificationFetchError,
  MarkAsRead,
  MarkAllRead,
} from '../slices/NotificationSlice';
// mui
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GavelIcon from '@mui/icons-material/Gavel';
// types
import { INotificationBase, INotificationUnified } from '../../types/share';
import { createSelector } from '@reduxjs/toolkit';

export const notificationWithPagination =
  (page = 1, limit = 5) =>
  async (dispatch: AppDispatch) => {
    const token = await ensureAccessToken();
    if (!token) return;
    try {
      dispatch(NotificationFetch());
      const response = await apiFetch(`${process.env.REACT_APP_API_NOTIFICATIONS}?page=${page}&limit=${limit}`);
      if (!response.ok) {
        console.error('Ошибка получения уведомлений', response.statusText);
        return null;
      }
      const data = await response.json();
      dispatch(NotificationFetchSuccess(data));
    } catch (error) {
      console.log('не удалось получить уведомления');
      dispatch(NotificationFetchError(error));
    }
  };

// Массив ID уведомлений, которые нужно пометить
export const notificationMarkRead = (arrIDMark: Array<number>) => async (dispatch: AppDispatch) => {
  const token = await ensureAccessToken();
  if (!token) return;
  try {
    dispatch(NotificationFetch());
    const response = await apiFetch(`${process.env.REACT_APP_API_NOTIFICATIONS}/mark-read`, {
      method: 'POST',
      body: JSON.stringify(arrIDMark),
    });
    if (!response.ok) {
      console.error('Ошибка отметки уведомлений:', arrIDMark, response.statusText);
      return null;
    }
    dispatch(MarkAsRead(arrIDMark));
  } catch (error) {
    console.log('Ошибка отметки уведомлений');
    dispatch(NotificationFetchError(error));
  }
};

export const notificationAllRead = () => async (dispatch: AppDispatch) => {
  const token = await ensureAccessToken();
  if (!token) return;

  try {
    dispatch(NotificationFetch());
    const response = await apiFetch(`${process.env.REACT_APP_API_NOTIFICATIONS}/mark-all-read`, {
      method: 'POST',
    });
    if (!response.ok) {
      console.error('Ошибка отметки уведомлений', response.statusText);
      return null;
    }
    dispatch(MarkAllRead());
  } catch (error) {
    console.log('Ошибка отметки уведомлений');
    dispatch(NotificationFetchError(error));
  }
};

export const notificationUnread = () => {
  // REACT_APP_API_NOTIFICATIONS
};

const normalizeNotificationType = (type: unknown) =>
  String(type ?? '')
    .trim()
    .toLowerCase();

export const mapHubNotification = (data: INotificationBase): INotificationUnified | null => {
  if (!data || typeof data !== 'object') return null;

  let payload: Record<string, any> | null = null;
  const rawPayload = (data as any).payload ?? (data as any).Payload;
  try {
    if (typeof rawPayload === 'string') {
      payload = JSON.parse(rawPayload);
    } else if (rawPayload && typeof rawPayload === 'object') {
      payload = rawPayload as any;
    } else {
      payload = null;
    }
  } catch (e) {
    console.error('Failed to parse payload', e);
    return null;
  }

  const type = normalizeNotificationType((data as any).type ?? (data as any).Type);
  const date = data.date || data.createdAt || (data as any).Date || new Date().toISOString();
  const isRead = data.isRead || (data as any).IsRead || false;
  const id = data.id ?? (data as any).Id;

  if (id == null || id === '') return null;

  switch (type) {
    case 'newfollower':
    case '3':
      return {
        id,
        title: 'Новый подписчик!',
        message: `${payload?.SubscriberName ?? payload?.subscriberName} подписался на вас.`,
        link: `/${payload?.SubscriberName ?? payload?.subscriberName}`,
        date,
        icon: PersonAddIcon,
        isRead,
      };
    case 'streamstarted':
    case '1':
      return {
        id: id ?? payload?.StreamId ?? payload?.streamId,
        date,
        title: 'Новый стрим!',
        message: `${payload?.StreamerName ?? payload?.streamerName} начал стрим ${payload?.StreamName ?? payload?.streamName}.`,
        link: `/${payload?.StreamerName ?? payload?.streamerName}`,
        icon: SmartDisplayIcon,
        isRead,
      };
    case 'supportticketreply':
    case '7':
      return {
        id,
        title: 'Ответ поддержки',
        message: payload?.Message ?? payload?.message ?? 'Поддержка ответила на ваш тикет',
        link: '/settings/support',
        date,
        icon: SupportAgentIcon,
        isRead,
      };
    case 'platformsanction':
    case '8':
      return {
        id,
        title: payload?.Title ?? payload?.title ?? 'Вам выдали наказание',
        message: payload?.Message ?? payload?.message ?? 'Обновление по наказанию платформы',
        link: '/settings/support',
        date,
        icon: GavelIcon,
        isRead,
      };
    case 'platformappeal':
    case '9':
      return {
        id,
        title: 'Апелляция',
        message: payload?.Message ?? payload?.message ?? payload?.Title ?? 'Решение по апелляции',
        link: '/settings/support',
        date,
        icon: GavelIcon,
        isRead,
      };
    default:
      return null;
  }
};
export const selectNotifications = (state: RootState) => state.notiications.paged.notifications;

export const SelectAllNotification = createSelector([selectNotifications], (notifications) => {
  if (!notifications) return [];
  return notifications.slice().sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});
const selectLiveNotifications = (state: RootState) => state.notiications.live;
const selectPagedNotifications = SelectAllNotification;

export const selectUnreadNotifications = createSelector([selectLiveNotifications], (live) =>
  live.filter((n) => !n.isRead)
);

// объединяем live + paged (dedupe by id, live wins)
export const selectAllNotificationsUnified = createSelector(
  [selectUnreadNotifications, selectPagedNotifications],
  (live, paged) => {
    const seen = new Set<string | number>();
    const result: typeof live = [];
    for (const n of [...live, ...paged]) {
      if (n?.id == null || seen.has(n.id)) continue;
      seen.add(n.id);
      result.push(n);
    }
    return result;
  }
);
// export const SelectAllNotification = (state: RootState) => {
//   const live = state.notiications.live;
//   const paged = state.notiications.paged.notifications;

//   return [...live, ...paged].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
// }

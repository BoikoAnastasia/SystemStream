import { getCookie } from '../../utils/cookieFunctions';
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
    const token = getCookie('tokenData');
    if (!token) return;
    try {
      dispatch(NotificationFetch());
      const response = await fetch(`${process.env.REACT_APP_API_NOTIFICATIONS}?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  const token = getCookie('tokenData');
  if (!token) return;
  try {
    dispatch(NotificationFetch());
    const response = await fetch(`${process.env.REACT_APP_API_NOTIFICATIONS}/mark-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
  const token = getCookie('tokenData');
  if (!token) return;

  try {
    dispatch(NotificationFetch());
    const response = await fetch(`${process.env.REACT_APP_API_NOTIFICATIONS}/mark-all-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
  let payload: Record<string, any> | null = null;
  const rawPayload = (data as any).payload ?? (data as any).Payload;
  try {
    payload = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : (rawPayload as any);
  } catch (e) {
    console.error('Failed to parse payload', e);
  }

  const type = normalizeNotificationType((data as any).type ?? (data as any).Type);
  const date = data.date || data.createdAt || (data as any).Date || new Date().toISOString();
  const isRead = data.isRead || (data as any).IsRead || false;
  const id = data.id ?? (data as any).Id;

  switch (type) {
    case 'newfollower':
    case '3':
      return {
        id: id!,
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
        id: id!,
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
        id: id!,
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
        id: id!,
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

// объединяем live + paged
export const selectAllNotificationsUnified = createSelector(
  [selectUnreadNotifications, selectPagedNotifications],
  (live, paged) => [...live, ...paged]
);
// export const SelectAllNotification = (state: RootState) => {
//   const live = state.notiications.live;
//   const paged = state.notiications.paged.notifications;

//   return [...live, ...paged].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
// }

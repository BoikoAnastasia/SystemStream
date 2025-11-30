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
// types
import { INotificationBase } from '../../types/share';
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

export const mapHubNotification = (data: INotificationBase) => {
  let payload = null;
  try {
    payload = typeof data.payload === 'string' ? JSON.parse(data.payload) : data.payload;
  } catch (e) {
    console.error('Failed to parse payload', e);
  }
  switch (data.type) {
    case 'NewFollower':
      return {
        id: data.id,
        title: 'Новый подписчик!',
        message: `${payload.SubscriberName} подписался на вас.`,
        link: `/${payload.SubscriberName}`,
        date: data.date || data.createdAt || new Date().toISOString(),
        icon: PersonAddIcon,
        isRead: data.isRead || false,
      };
    case 'StreamStarted':
      return {
        id: payload.StreamId,
        date: data.date || data.createdAt || new Date().toISOString(),
        title: 'Новый стрим!',
        message: `${payload.StreamerName} начал стрим ${payload.StreamName}.`,
        link: `/${payload.StreamerName}`,
        icon: SmartDisplayIcon,
        isRead: data.isRead || false,
      };
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

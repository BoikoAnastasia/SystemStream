import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotificationBase, INotificationSlice } from '../../types/share';
import { mapHubNotification } from '../actions/NotificationActions';

const initialState: INotificationSlice = {
  paged: {
    notifications: [],
    page: 1,
    limit: 5,
    totalCount: 0,
  },
  live: [],
  isError: false,
  isLoading: false,
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    NotificationFetch: (state) => {
      state.isError = null;
      state.isLoading = true;
    },
    NotificationFetchSuccess: (state, action: PayloadAction<any>) => {
      const payload = action.payload ?? {};
      const rawNotifications = payload.notifications;
      const notifications: INotificationBase[] = Array.isArray(rawNotifications) ? rawNotifications : [];

      const mapped = notifications
        .map((not: INotificationBase) => mapHubNotification(not))
        .filter((n): n is NonNullable<typeof n> => Boolean(n));

      state.paged.notifications = mapped;
      state.paged.limit = typeof payload.limit === 'number' ? payload.limit : initialState.paged.limit;
      state.paged.totalCount =
        typeof payload.totalCount === 'number' ? payload.totalCount : initialState.paged.totalCount;
      state.paged.page = typeof payload.page === 'number' ? payload.page : initialState.paged.page;

      state.isError = null;
      state.isLoading = false;
    },
    NotificationFetchError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    AddNotification: (state, action: PayloadAction<INotificationBase>) => {
      const notif = mapHubNotification(action.payload);
      if (!notif) return;

      // проверяем, нет ли уже такого уведомления в live или paged
      const exists =
        state.live.some((n) => n.id === notif.id) || state.paged.notifications.some((n) => n.id === notif.id);
      if (exists) return;

      state.live.unshift(notif);
    },
    MarkAsRead: (state, action: PayloadAction<number[]>) => {
      const idSet = new Set(action.payload);
      state.live.forEach((n) => {
        if (idSet.has(n.id)) n.isRead = true;
      });

      state.paged.notifications.forEach((n) => {
        if (idSet.has(n.id)) n.isRead = true;
      });
    },
    MarkAllRead: (state) => {
      state.paged.notifications.forEach((n) => (n.isRead = true));
      state.live.forEach((n) => (n.isRead = true));

      state.paged.notifications = [];
      state.live = [];
    },
    ClearNotification: (state) => {
      state.isError = null;
      state.isLoading = false;
      state.live = [];
      state.paged.notifications = [];
      state.paged.page = 1;
      state.paged.totalCount = 0;
    },
  },
});

export const {
  NotificationFetch,
  NotificationFetchSuccess,
  NotificationFetchError,
  AddNotification,
  MarkAsRead,
  MarkAllRead,
  ClearNotification,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;

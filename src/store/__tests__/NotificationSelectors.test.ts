import { selectAllNotificationsUnified } from '../actions/NotificationActions';

describe('notification selectors robustness', () => {
  test('selectAllNotificationsUnified deduplicates the same notification from live and paged state', () => {
    const repeatedNotification = {
      id: 42,
      title: 'Новый подписчик!',
      message: 'user подписался на вас.',
      link: '/user',
      date: '2026-08-19T12:00:00.000Z',
      icon: () => null,
      isRead: false,
    };

    const state = {
      notiications: {
        live: [repeatedNotification],
        paged: {
          notifications: [repeatedNotification],
          page: 1,
          limit: 5,
          totalCount: 1,
        },
      },
    } as any;

    expect(selectAllNotificationsUnified(state)).toEqual([repeatedNotification]);
  });
});

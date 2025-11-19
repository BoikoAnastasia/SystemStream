import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { INotification } from '../../types/share';
import { getCookie } from '../../utils/cookieFunctions';

export const useNotificationHub = (addNotification: (n: INotification) => void) => {
  const hubRef = useRef<signalR.HubConnection | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/notificationHub`;

  const token = getCookie('tokenData');

  useEffect(() => {
    const hub = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token || '' })
      .withAutomaticReconnect()
      .build();

    hubRef.current = hub;

    hub.on('ReceiveNotification', (data) => {
      // Проверяем, что данные существуют и содержат необходимые поля
      if (!data) {
        console.warn('Received notification with no data');
        return;
      }

      const { type, streamerName, streamName } = data;

      // Проверяем обязательные поля
      if (!streamerName || !streamName) {
        console.warn('Received notification with missing required fields:', data);
        return;
      }

      // Создаем безопасные значения для всех полей
      const safeType = type || 'info';
      const safeStreamerName = streamerName || 'Неизвестный стример';
      const safeStreamName = streamName || 'Новая трансляция';

      addNotification({
        id: Date.now(),
        type: safeType,
        title: 'Новый стрим!',
        message: `${safeStreamerName} начал трансляцию: ${safeStreamName}`,
        link: safeStreamerName,
      });
    });

    hub
      .start()
      .then(() => console.log('Connected to NotificationHub'))
      .catch(console.error);

    return () => {
      hub.stop().catch(console.error);
    };
  }, [addNotification, hubUrl, token]);
};

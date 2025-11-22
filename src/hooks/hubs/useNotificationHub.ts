import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { INotification } from '../../types/share';
import { getCookie } from '../../utils/cookieFunctions';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

export const useNotificationHub = (addNotification: (n: INotification) => void) => {
  const hubRef = useRef<signalR.HubConnection | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/notificationHub`;

  const token = getCookie('tokenData');

  // useEffect(() => {

  //   const safeStreamerName = 'Вася';
  //   const safeStreamName = 'Васин стрим';
  //   addNotification({
  //     id: crypto.randomUUID(),
  //     date: Date.now().toLocaleString(),
  //     type: "fsdfsdf",
  //     title: 'Новый стрим!',
  //     message: `${safeStreamerName} начал трансляцию: ${safeStreamName}`,
  //     link: safeStreamerName,
  //     icon: SmartDisplayIcon
  //   });
  // }, [])

  useEffect(() => {
    if (!token) return;

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

      const { type, streamerName, streamName, dateStream } = data;

      // Проверяем обязательные поля
      if (!streamerName || !streamName) {
        console.warn('Received notification with missing required fields:', data);
        return;
      }

      // Создаем безопасные значения для всех полей
      const safeType = type || 'info';
      const safeStreamerName = streamerName || 'Неизвестный стример';
      const safeStreamName = streamName || 'Новая трансляция';

      const date = new Date(dateStream);
      console.log(date);
      console.log(date.toLocaleString());
      //TODO по типу добавлять картинку
      addNotification({
        id: crypto.randomUUID(),
        date: date,
        type: safeType,
        title: 'Новый стрим!',
        message: `${safeStreamerName} начал трансляцию: ${safeStreamName}`,
        link: safeStreamerName,
        icon: SmartDisplayIcon,
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

import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
// utils
import { getCookie } from '../../utils/cookieFunctions';
import { formatData } from '../../utils/formatData';
// mui
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
// types
import { INotification } from '../../types/share';

export const useNotificationHub = (addNotification: (n: INotification) => void) => {
  const hubRef = useRef<signalR.HubConnection | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/notificationHub`;

  const token = getCookie('tokenData');

  useEffect(() => {
    if (!token) return;

    const hub = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    hubRef.current = hub;

    hub.on('ReceiveNotification', (data) => {
      if (!data) return;

      const { Type, Message, Date: date, StreamerId } = data;
      console.log('RAW notification:', data);
      addNotification({
        id: crypto.randomUUID(),
        type: Type || 'info',
        date: formatData(date),
        title: Type === 'stream' ? 'Новый стрим!' : 'Уведомление',
        message: Message,
        link: StreamerId ? `/stream/${StreamerId}` : null,
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

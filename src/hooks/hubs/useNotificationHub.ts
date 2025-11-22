import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { getCookie } from '../../utils/cookieFunctions';
import { formatData } from '../../utils/formatData';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { INotification } from '../../types/share';

interface StreamStartedPayload {
  StreamId: number;
  StreamerId: number;
  StreamerName: string;
  StreamName: string;
}

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

    // Подписка на уведомления
    hub.on('ReceiveNotification', (data: any) => {
      if (!data) return;

      let payload: StreamStartedPayload | null = null;
      try {
        if (data.payload) {
          payload = JSON.parse(data.payload) as StreamStartedPayload;
        }
      } catch (e) {
        console.error('Bad payload', e);
      }

      if (payload) {
        const { StreamId, StreamerId, StreamerName, StreamName } = payload;
        console.log('payload', payload);
        addNotification({
          id: StreamId,
          streamerId: StreamerId,
          date: formatData(data.date),
          type: data.type,
          title: 'Новый стрим!',
          message: `${StreamerName} начал стрим "${StreamName}"`,
          link: StreamerName,
          icon: SmartDisplayIcon,
        });
      }
    });

    // Стартуем соединение
    hub
      .start()
      .then(() => console.log('Connected to NotificationHub'))
      .catch((err) => console.error('NotificationHub connection failed:', err));

    // Очистка
    return () => {
      if (hubRef.current && hubRef.current.state === signalR.HubConnectionState.Connected) {
        hubRef.current.stop().catch(console.error);
      }
    };
  }, [addNotification, hubUrl, token]);
};

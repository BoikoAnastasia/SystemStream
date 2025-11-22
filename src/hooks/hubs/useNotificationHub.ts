import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { INotification } from '../../types/share';
import { getCookie } from '../../utils/cookieFunctions';
import { formatData } from '../../utils/formatData';

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
    const hub = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    hubRef.current = hub;

    hub.on('ReceiveNotification', (data: any) => {
      console.log('Raw notification payload:', data);

      if (!data) return;

      let payload: StreamStartedPayload | null = null;
      try {
        payload = typeof data.payload === 'string' ? JSON.parse(data.payload) : data.payload;
      } catch (e) {
        console.error('Failed to parse payload', e);
      }

      if (payload) {
        const { StreamId, StreamerId, StreamerName, StreamName } = payload;

        addNotification({
          id: Number(`${StreamId}${Date.now()}`),
          streamerId: StreamerId,
          date: formatData(data.date),
          type: data.type,
          title: 'Новый стрим!',
          message: `${StreamerName} начал стрим "${StreamName}"`,
          link: `/${StreamerName}`,
          icon: SmartDisplayIcon,
        });
        console.log('Notification added');
      }
    });

    hub
      .start()
      .then(() => console.log('Connected to NotificationHub'))
      .catch((err) => console.error('NotificationHub connection failed:', err));

    return () => {
      hub.stop().catch(() => {});
    };
  }, [addNotification, hubUrl, token]);
};

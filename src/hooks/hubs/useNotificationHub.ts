import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
// utils
import { getCookie } from '../../utils/cookieFunctions';
import { formatData } from '../../utils/formatData';
// mui
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
// types
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

    hub.on('ReceiveNotification', (data) => {
      if (!data) return;

      let payload: StreamStartedPayload | null = null;
      try {
        payload = JSON.parse(data.payload || '{}');
      } catch (e) {
        console.error('Bad payload', e);
      }

      const type = data.type;
      if (payload) {
        const { StreamId, StreamerId, StreamerName, StreamName } = payload;

        addNotification({
          id: StreamId,
          streamerId: StreamerId,
          date: formatData(data.date),
          type,
          title: 'Новый стрим!',
          message: `${StreamerName} начал стрим ${StreamName}`,
          link: StreamerName,
          icon: SmartDisplayIcon,
        });
      }
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

import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { INotification } from '../../types/share';

export const useNotificationHub = (addNotification: (n: INotification) => void) => {
  const hubRef = useRef<signalR.HubConnection | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/notificationHub`;

  useEffect(() => {
    const hub = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    hubRef.current = hub;

    hub.on('ReceiveNotification', (data) => {
      addNotification({
        id: Date.now(),
        type: data.type,
        title: 'Новый стрим!',
        message: `${data.streamerName} начал трансляцию: ${data.streamName}`,
        link: data.streamerName,
      });
    });

    hub
      .start()
      .then(() => console.log('Connected to NotificationHub'))
      .catch(console.error);

    return () => {
      hub.stop().catch(console.error);
    };
  }, [addNotification, hubUrl]);
};

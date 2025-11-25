import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as signalR from '@microsoft/signalr';
// store
import { AppDispatch } from '../../store/store';
import { NotificationSlice } from '../../store/slices/NotificationSlice';
// utils
import { getCookie } from '../../utils/cookieFunctions';
// types
import { INotificationBase } from '../../types/share';

export const useNotificationHub = (addNotification: (n: INotificationBase) => void) => {
  const hubRef = useRef<signalR.HubConnection | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/notificationHub`;
  const token = getCookie('tokenData');
  const dispatch = useDispatch<AppDispatch>();

  const { AddNotification } = NotificationSlice.actions;

  useEffect(() => {
    const hub = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    hubRef.current = hub;

    hub.on('ReceiveNotification', (data: any) => {
      console.log('Raw notification payload:', data);

      if (!data) return;
      dispatch(AddNotification(data));
    });

    hub
      .start()
      .then(() => console.log('Connected to NotificationHub'))
      .catch((err) => console.error('NotificationHub connection failed:', err));

    return () => {
      hub.stop().catch(() => {});
    };
  }, [AddNotification, dispatch, hubUrl, token]);
};

import { useEffect, useState, useCallback } from 'react';
// microsoft
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
// types
import { IStream } from '../types/share';

export const useStreamHub = (nickname?: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);

  // Создаём подключение
  useEffect(() => {
    if (!nickname) return;
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Warning) // логи предупреждений
        .build();
      setConnection(newConnection);
      console.log(`[StreamHub] Connection object created for ${nickname}`);
    } catch (err) {
      console.warn(`[StreamHub] Failed to create connection:`, err);
    }
  }, [nickname]);

  // Запуск подключения с безопасной обработкой ошибок
  useEffect(() => {
    if (!connection) return;
    let isMounted = true;

    const startConnection = async () => {
      if (!connection) return;
      try {
        await connection.start();
        if (!isMounted) return;
        setIsConnected(true);
        console.log(`[StreamHub] Connected to ${nickname}`);

        if (localStorage.getItem('token')) {
          try {
            await connection.invoke('SubscribeToStreamNotifications');
            console.log('[StreamHub] Subscribed to stream notifications');
          } catch (invokeErr) {
            console.warn('[StreamHub] Failed to invoke SubscribeToStreamNotifications:', invokeErr);
          }
        }
      } catch (startErr) {
        setIsConnected(false);
        console.warn('[StreamHub] Failed to start connection, retrying in 10s:', startErr);
        setTimeout(startConnection, 10000);
      }
    };

    startConnection();

    return () => {
      isMounted = false;
      if (connection.state === HubConnectionState.Connected) {
        connection
          .stop()
          .then(() => console.log('[StreamHub] Connection stopped'))
          .catch((stopErr) => console.warn('[StreamHub] Failed to stop connection:', stopErr));
      }
    };
  }, [connection, nickname]);

  // Методы join/leave с проверкой состояния
  const joinStream = useCallback(
    async (streamerUsername: string) => {
      if (!connection || connection.state !== HubConnectionState.Connected) {
        console.warn('[StreamHub] Cannot join stream, connection not ready');
        return;
      }
      try {
        await connection.invoke('JoinStream', streamerUsername);
        console.log(`[StreamHub] Joined stream of ${streamerUsername}`);
      } catch (err) {
        console.warn(`[StreamHub] Failed to join stream of ${streamerUsername}:`, err);
      }
    },
    [connection]
  );

  const leaveStream = useCallback(
    async (streamerUsername: string) => {
      if (!connection || connection.state !== HubConnectionState.Connected) {
        console.warn('[StreamHub] Cannot leave stream, connection not ready');
        return;
      }
      try {
        await connection.invoke('LeaveStream', streamerUsername);
        console.log(`[StreamHub] Left stream of ${streamerUsername}`);
      } catch (err) {
        console.warn(`[StreamHub] Failed to leave stream of ${streamerUsername}:`, err);
      }
    },
    [connection]
  );

  // Подписка на события
  useEffect(() => {
    if (!connection) return;

    connection.on('StreamStarted', (stream: IStream) => {
      console.log('[StreamHub] StreamStarted event:', stream);
      setCurrentStream(stream);
    });

    connection.on('StreamerStartedStream', (stream: IStream) => {
      console.log('[StreamHub] StreamerStartedStream event:', stream);
    });

    connection.on('StreamEnded', () => {
      console.log('[StreamHub] StreamEnded event');
      setCurrentStream(null);
    });

    connection.on('ViewerCountUpdated', (count: number) => {
      console.log('[StreamHub] ViewerCountUpdated event:', count);
    });

    connection.on('Error', (msg: string) => {
      console.warn('[StreamHub] Error event:', msg);
    });

    return () => {
      connection.off('StreamStarted');
      connection.off('StreamerStartedStream');
      connection.off('StreamEnded');
      connection.off('ViewerCountUpdated');
      connection.off('Error');
    };
  }, [connection]);

  return {
    connection,
    isConnected,
    currentStream,
    joinStream,
    leaveStream,
  };
};

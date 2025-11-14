import { useEffect, useState, useRef, useCallback } from 'react';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import Hls from 'hls.js';
import { IStream } from '../types/share';

export const useStreamHub = (nickname?: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);

  const hlsRef = useRef<Hls | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Создаём подключение
  useEffect(() => {
    if (!nickname) return;

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    setConnection(newConnection);
    console.log(`[StreamHub] Connection object created for ${nickname}`);
  }, [nickname]);

  // Старт подключения
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

        // Подписка на уведомления, если есть токен
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
        connection.stop().then(() => console.log('[StreamHub] Connection stopped'));
      }
    };
  }, [connection, nickname]);

  // join / leave
  const joinStream = useCallback(async () => {
    if (!connection || connection.state !== HubConnectionState.Connected) return;
    try {
      await connection.invoke('JoinStream', nickname);
      console.log(`[StreamHub] Joined stream of ${nickname}`);
    } catch (err) {
      console.warn(`[StreamHub] Failed to join stream of ${nickname}:`, err);
    }
  }, [connection, nickname]);

  const leaveStream = useCallback(async () => {
    if (!connection || connection.state !== HubConnectionState.Connected) return;
    try {
      await connection.invoke('LeaveStream', nickname);
      console.log(`[StreamHub] Left stream of ${nickname}`);
    } catch (err) {
      console.warn(`[StreamHub] Failed to leave stream of ${nickname}:`, err);
    }
  }, [connection, nickname]);

  // Подписка на события
  useEffect(() => {
    if (!connection) return;

    const handleStreamStarted = (stream: IStream) => {
      setCurrentStream(stream);

      // Создаём HLS только один раз
      if (Hls.isSupported() && videoRef.current) {
        if (!hlsRef.current) {
          hlsRef.current = new Hls();
          hlsRef.current.attachMedia(videoRef.current);
        }
        // Загружаем источник только если поменялся URL
        if (videoRef.current.src !== stream.hlsUrl) {
          hlsRef.current.loadSource(stream.hlsUrl);
          hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current?.play());
        }
      } else if (videoRef.current && videoRef.current.src !== stream.hlsUrl) {
        videoRef.current.src = stream.hlsUrl;
        videoRef.current.play();
      }
    };

    const handleStreamEnded = () => setCurrentStream(null);

    const handleViewerCountUpdated = (count: number) => {
      setCurrentStream((prev) => (prev ? { ...prev, viewers: count } : prev));
    };

    connection.on('StreamStarted', handleStreamStarted);
    connection.on('StreamerStartedStream', handleStreamStarted);
    connection.on('StreamEnded', handleStreamEnded);
    connection.on('ViewerCountUpdated', handleViewerCountUpdated);

    return () => {
      connection.off('StreamStarted', handleStreamStarted);
      connection.off('StreamerStartedStream', handleStreamStarted);
      connection.off('StreamEnded', handleStreamEnded);
      connection.off('ViewerCountUpdated', handleViewerCountUpdated);
    };
  }, [connection]);

  return {
    connection,
    isConnected,
    currentStream,
    videoRef,
    joinStream,
    leaveStream,
  };
};

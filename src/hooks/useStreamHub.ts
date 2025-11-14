import { useEffect, useState, useCallback, useRef } from 'react';
import { IStream } from '../types/share';

const STREAM_POLL_INTERVAL = 5000; // интервал обновления в мс

export const useStreamHub = (nickname?: string) => {
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const streamRef = useRef<IStream | null>(null); // для сравнения URL

  // Функция получения стрима по никнейму
  const fetchStream = useCallback(async () => {
    if (!nickname) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}`);
      if (!response.ok) {
        console.warn('[StreamHub] Failed to fetch stream:', response.statusText);
        setCurrentStream(null);
        setIsConnected(false);
        streamRef.current = null;
        return;
      }
      const data: IStream | null = await response.json();

      // Если URL стрима не поменялся, не обновляем state
      if (data?.hlsUrl && data?.hlsUrl === streamRef.current?.hlsUrl) {
        return;
      }

      setCurrentStream(data);
      setIsConnected(!!data?.isLive);
      streamRef.current = data;
    } catch (err) {
      console.warn('[StreamHub] Error fetching stream:', err);
      setCurrentStream(null);
      setIsConnected(false);
      streamRef.current = null;
    }
  }, [nickname]);

  // Пуллинг каждые X секунд
  useEffect(() => {
    if (!nickname) return;

    fetchStream(); // первый запрос сразу
    const interval = setInterval(fetchStream, STREAM_POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [nickname, fetchStream]);

  // join / leave (REST-запросы к серверу)
  const joinStream = useCallback(async () => {
    if (!nickname || !currentStream?.isLive) return;
    try {
      await fetch(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}/join`, { method: 'POST' });
      console.log(`[StreamHub] Joined stream of ${nickname}`);
    } catch (err) {
      console.warn(`[StreamHub] Failed to join stream of ${nickname}:`, err);
    }
  }, [nickname, currentStream]);

  const leaveStream = useCallback(async () => {
    if (!nickname || !currentStream?.isLive) return;
    try {
      await fetch(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}/leave`, { method: 'POST' });
      console.log(`[StreamHub] Left stream of ${nickname}`);
    } catch (err) {
      console.warn(`[StreamHub] Failed to leave stream of ${nickname}:`, err);
    }
  }, [nickname, currentStream]);

  return {
    currentStream,
    isConnected,
    joinStream,
    leaveStream,
  };
};

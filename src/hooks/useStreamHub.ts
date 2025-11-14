import { useEffect, useState, useCallback } from 'react';
import { IStream } from '../types/share';

const STREAM_POLL_INTERVAL = 5000; // интервал обновления в мс

export const useStreamHub = (nickname?: string) => {
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Функция получения стрима по никнейму
  const fetchStream = useCallback(async () => {
    if (!nickname) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}`);
      if (!response.ok) {
        console.warn('[StreamHub] Failed to fetch stream:', response.statusText);
        setCurrentStream(null);
        setIsConnected(false);
        return;
      }
      const data: IStream | null = await response.json();
      setCurrentStream(data);
      setIsConnected(!!data?.isLive);
    } catch (err) {
      console.warn('[StreamHub] Error fetching stream:', err);
      setCurrentStream(null);
      setIsConnected(false);
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
    if (!nickname) return;
    try {
      await fetch(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}/join`, { method: 'POST' });
      console.log(`[StreamHub] Joined stream of ${nickname}`);
    } catch (err) {
      console.warn(`[StreamHub] Failed to join stream of ${nickname}:`, err);
    }
  }, [nickname]);

  const leaveStream = useCallback(async () => {
    if (!nickname) return;
    try {
      await fetch(`${process.env.REACT_APP_API_STREAM_VIEW}/${nickname}/leave`, { method: 'POST' });
      console.log(`[StreamHub] Left stream of ${nickname}`);
    } catch (err) {
      console.warn(`[StreamHub] Failed to leave stream of ${nickname}:`, err);
    }
  }, [nickname]);

  return {
    currentStream,
    isConnected,
    joinStream,
    leaveStream,
  };
};

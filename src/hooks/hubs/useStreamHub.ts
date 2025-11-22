import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import Hls from 'hls.js';
import { createGuestKey } from '../../utils/createGuestKey';
import { IStream } from '../../types/share';

interface UseStreamHubProps {
  nickname: string | undefined;
  userData: { id: number } | null;
}

export const useStreamHub = ({ nickname, userData }: UseStreamHubProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const userTokenRef = useRef<string | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/streamHub`;

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);

  // === SignalR connection ===
  useEffect(() => {
    console.log('userData', userData?.id);
    if (!nickname || !userData?.id) return;

    if (!userTokenRef.current) userTokenRef.current = createGuestKey();

    const hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl).withAutomaticReconnect().build();

    setConnection(hubConnection);

    let interval: NodeJS.Timer;

    // Подписки
    hubConnection.on('StreamJoined', (streamInfo: any) => {
      if (!streamInfo) {
        setCurrentStream(null);
        return;
      }
      setCurrentStream({
        streamId: streamInfo.streamId ?? streamInfo.StreamId ?? 0,
        streamName: streamInfo.streamName ?? streamInfo.StreamName ?? 'Unknown',
        streamerId: streamInfo.streamerId ?? streamInfo.StreamerId ?? 0,
        streamerName: streamInfo.streamerName ?? streamInfo.StreamerName ?? 'Unknown',
        tags: streamInfo.tags ?? [],
        previewlUrl: streamInfo.previewlUrl ?? null,
        hlsUrl: streamInfo.hlsUrl ?? streamInfo.HlsUrl ?? '',
        totalViews: streamInfo.totalViews ?? 0,
        startedAt: streamInfo.startedAt ?? new Date().toISOString(),
        isLive: streamInfo.isLive ?? streamInfo.IsLive ?? false,
      });
    });

    hubConnection.on('UpdateViewerCount', (count: number) => {
      setViewerCount(count);
    });

    hubConnection.on('StreamStatusChanged', (data: any) => {
      if (data.Status === 'Live' && data.Stream) {
        const stream = data.Stream;
        setCurrentStream({
          streamId: stream.streamId ?? stream.StreamId ?? 0,
          streamName: stream.streamName ?? stream.StreamName ?? 'Unknown',
          streamerId: stream.streamerId ?? stream.StreamerId ?? 0,
          streamerName: stream.streamerName ?? stream.StreamerName ?? 'Unknown',
          tags: stream.tags ?? [],
          previewlUrl: stream.previewlUrl ?? null,
          hlsUrl: stream.hlsUrl ?? stream.HlsUrl ?? '',
          totalViews: stream.totalViews ?? 0,
          startedAt: stream.startedAt ?? new Date().toISOString(),
          isLive: stream.isLive ?? stream.IsLive ?? true,
        });
      } else {
        setCurrentStream(null);
      }
    });

    // Старт соединения
    hubConnection
      .start()
      .then(() => {
        console.log('Connected to StreamHub');
        // Присоединяемся к стриму
        hubConnection.invoke('JoinStream', nickname, userTokenRef.current).catch(console.error);

        // Авто-обновление статуса каждые 15 секунд
        const streamerId = userData.id;
        if (streamerId) {
          hubConnection.invoke('UpdateStreamStatus', streamerId).catch(console.error);
          interval = setInterval(() => {
            if (hubConnection.state === signalR.HubConnectionState.Connected) {
              hubConnection.invoke('UpdateStreamStatus', streamerId).catch(console.error);
            }
          }, 15000);
        }
      })
      .catch(console.error);

    // Cleanup при размонтировании
    return () => {
      if (interval) clearInterval(interval);

      if (hubConnection.state === signalR.HubConnectionState.Connected) {
        hubConnection.invoke('LeaveStream', nickname, userTokenRef.current).finally(() => hubConnection.stop());
      }

      hubConnection.off('StreamJoined');
      hubConnection.off('UpdateViewerCount');
      hubConnection.off('StreamStatusChanged');
    };
  }, [nickname, hubUrl, userData?.id]);

  // === HLS player ===
  useEffect(() => {
    if (!currentStream || !videoRef.current || !currentStream.isLive || !currentStream.hlsUrl) {
      // Очищаем плеер если оффлайн
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (videoRef.current) videoRef.current.src = '';
      return;
    }

    // Если HLS уже играет тот же URL — ничего не делаем
    if (hlsRef.current && hlsRef.current.url === currentStream.hlsUrl) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(currentStream.hlsUrl);
      hls.attachMedia(videoRef.current);
      videoRef.current.muted = true; // для autoplay
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current?.play().catch(() => {}));
      hlsRef.current = hls;
    } else {
      videoRef.current.src = currentStream.hlsUrl;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentStream]);

  return { videoRef, currentStream, viewerCount, connection };
};

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
  const currentHlsUrlRef = useRef<string | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/streamHub`;

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);

  // === SignalR connection ===
  useEffect(() => {
    console.log('useStreamHub: userData', userData?.id);
    if (!nickname || !userData?.id) return;

    if (!userTokenRef.current) userTokenRef.current = createGuestKey();

    const hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl).withAutomaticReconnect().build();

    setConnection(hubConnection);

    let interval: NodeJS.Timer | undefined;

    const handleStreamJoined = (streamInfo: any) => {
      console.log('SignalR StreamJoined', streamInfo);
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
    };

    const handleUpdateViewerCount = (count: number) => {
      setViewerCount(count);
    };

    const handleStreamStatusChanged = (data: any) => {
      console.log('FULL StreamStatusChanged payload:', JSON.stringify(data, null, 2));

      const isLive = data?.isLive ?? data?.IsLive ?? data?.status?.toString().toLowerCase() === 'live';

      if (!isLive) return;

      const stream: IStream = {
        streamId: data.streamId ?? 0,
        streamName: data.streamName ?? '',
        streamerName: data.streamerName ?? '',
        streamerId: data.streamerId ?? 0,
        tags: data.tags ?? [],
        previewlUrl: data.previewUrl,
        hlsUrl: data.hlsUrl,
        startedAt: data.startedAt ? new Date(data.startedAt) : new Date(),
        isLive: true,
        totalViews: data.totalViews,
      };

      handleStreamJoined(stream);
    };

    // Подписки
    hubConnection.on('StreamJoined', handleStreamJoined);
    hubConnection.on('UpdateViewerCount', handleUpdateViewerCount);
    hubConnection.on('StreamStatusChanged', handleStreamStatusChanged);

    hubConnection.onclose((err) => {
      console.warn('StreamHub connection closed', err);
    });

    // Старт соединения
    hubConnection
      .start()
      .then(() => {
        console.log('Connected to StreamHub');
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
        hubConnection
          .invoke('LeaveStream', nickname, userTokenRef.current)
          .finally(() => hubConnection.stop().catch(() => {}));
      } else {
        hubConnection.stop().catch(() => {});
      }

      hubConnection.off('StreamJoined');
      hubConnection.off('UpdateViewerCount');
      hubConnection.off('StreamStatusChanged');
      hubConnection.onclose(() => {});
    };
  }, [nickname, hubUrl, userData?.id]);

  // === HLS player ===
  useEffect(() => {
    const video = videoRef.current;

    const cleanupPlayer = () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.stopLoad();
        } catch (e) {}
        try {
          hlsRef.current.destroy();
        } catch (e) {}
        hlsRef.current = null;
      }
      currentHlsUrlRef.current = null;
      if (video) {
        try {
          video.pause();
        } catch {}
        try {
          video.removeAttribute('src');
          // для некоторых браузеров нужно вызвать load()
          video.load();
        } catch {}
      }
    };

    // Если нет стрима или он оффлайн — очищаем плеер
    if (!currentStream || !video || !currentStream.isLive || !currentStream.hlsUrl) {
      cleanupPlayer();
      return;
    }

    // Если уже загружен тот же URL — ничего не делаем
    if (currentHlsUrlRef.current === currentStream.hlsUrl) {
      return;
    }

    // иначе создаём новый
    cleanupPlayer();

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      currentHlsUrlRef.current = currentStream.hlsUrl;

      hls.loadSource(currentStream.hlsUrl);
      hls.attachMedia(video);
      if (video) video.muted = true; // автоплей
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video?.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.warn('hls error', event, data);
        // если фатальная ошибка — очистим плеер
        if (data && data.fatal) {
          try {
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              hls.startLoad();
            } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
              hls.recoverMediaError();
            } else {
              hls.destroy();
              cleanupPlayer();
            }
          } catch (e) {
            hls.destroy();
            cleanupPlayer();
          }
        }
      });
    } else {
      // fallback: просто src
      video.src = currentStream.hlsUrl;
      video.muted = true;
      video.play().catch(() => {});
      currentHlsUrlRef.current = currentStream.hlsUrl;
    }

    return () => {
      // cleanup при смене currentStream
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
      currentHlsUrlRef.current = null;
    };
  }, [currentStream]);

  return { videoRef, currentStream, viewerCount, connection };
};

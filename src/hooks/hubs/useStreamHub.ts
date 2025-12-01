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
  const hubRef = useRef<signalR.HubConnection | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const userTokenRef = useRef<string | null>(null);
  const currentHlsUrlRef = useRef<string | null>(null);
  const currentStreamIdRef = useRef<number | null>(null);

  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);

  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/streamHub`;

  // === Главное: стабильные ссылки на обработчики ===
  const handlersRef = useRef({
    handleStreamJoined: (streamInfo: any) => {},
    handleUpdateViewerCount: (count: number) => {},
    handleStreamStatusChanged: (data: any) => {},
  });

  // ================== SIGNALR CONNECTION ==================
  useEffect(() => {
    if (!nickname || !userData?.id) return;

    if (!userTokenRef.current) {
      userTokenRef.current = createGuestKey();
    }

    // Уже есть подключение → не создаём новое
    if (hubRef.current && hubRef.current.state !== signalR.HubConnectionState.Disconnected) {
      return;
    }

    const hub = new signalR.HubConnectionBuilder().withUrl(hubUrl).withAutomaticReconnect().build();

    hubRef.current = hub;

    // ----------- Обработчики с правильной ссылкой -----------
    handlersRef.current.handleStreamJoined = (streamInfo: any) => {
      if (!streamInfo) return setCurrentStream(null);

      const streamId = streamInfo.streamId ?? streamInfo.StreamId ?? 0;

      setCurrentStream((prev) =>
        prev?.streamId === streamId
          ? prev
          : {
              streamId,
              streamName: streamInfo.streamName,
              streamerId: streamInfo.streamerId,
              streamerName: streamInfo.streamerName,
              tags: streamInfo.tags ?? [],
              previewUrl: streamInfo.previewUrl ?? null,
              hlsUrl: streamInfo.hlsUrl ?? streamInfo.HlsUrl ?? '',
              totalViews: streamInfo.totalViews ?? 0,
              startedAt: streamInfo.startedAt ?? new Date().toISOString(),
              isLive: true,
            }
      );
    };

    handlersRef.current.handleUpdateViewerCount = (count: number) => {
      setViewerCount(count);
    };

    handlersRef.current.handleStreamStatusChanged = (data: any) => {
      const status = (data?.status ?? data?.Status ?? '').toLowerCase();

      if (['live', 'started', 'on'].includes(status) && data.stream) {
        return handlersRef.current.handleStreamJoined(data.stream);
      }

      if (['offline', 'stopped'].includes(status)) {
        return setCurrentStream(null);
      }
    };

    // ---------- удаляем старые обработчики (если соединение было) ----------
    hub.off('StreamJoined', handlersRef.current.handleStreamJoined);
    hub.off('UpdateViewerCount', handlersRef.current.handleUpdateViewerCount);
    hub.off('StreamStatusChanged', handlersRef.current.handleStreamStatusChanged);

    // ---------- подписки ----------
    hub.on('StreamJoined', handlersRef.current.handleStreamJoined);
    hub.on('UpdateViewerCount', handlersRef.current.handleUpdateViewerCount);
    hub.on('StreamStatusChanged', handlersRef.current.handleStreamStatusChanged);

    // ---------- старт подключения ----------
    hub
      .start()
      .then(() => {
        hub.invoke('JoinStream', nickname, userTokenRef.current).catch(console.error);

        // Статус обновляем раз в 15 сек
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            if (hub.state === signalR.HubConnectionState.Connected) {
              hub.invoke('UpdateStreamStatus', userData.id).catch(console.error);
            }
          }, 15000);
        }
      })
      .catch(console.error);

    // Автовосстановление
    hub.onreconnected(() => {
      hub.invoke('JoinStream', nickname, userTokenRef.current).catch(console.error);
    });

    // ---------- cleanup ----------
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      hub.off('StreamJoined', handlersRef.current.handleStreamJoined);
      hub.off('UpdateViewerCount', handlersRef.current.handleUpdateViewerCount);
      hub.off('StreamStatusChanged', handlersRef.current.handleStreamStatusChanged);

      hub.stop().catch(() => {});
      hubRef.current = null;
    };
  }, [nickname, userData?.id, hubUrl]);

  // ========================= HLS =========================
  useEffect(() => {
    const video = videoRef.current;

    const cleanup = () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.stopLoad();
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
      currentHlsUrlRef.current = null;

      if (video) {
        try {
          video.pause();
          video.removeAttribute('src');
          video.load();
        } catch {}
      }
    };

    if (!currentStream || !currentStream.isLive || !currentStream.hlsUrl || !video) {
      cleanup();
      return;
    }

    // Повторная загрузка того же источника → не надо
    if (currentStreamIdRef.current === currentStream.streamId && currentHlsUrlRef.current === currentStream.hlsUrl) {
      return;
    }

    cleanup();

    currentStreamIdRef.current = currentStream.streamId;
    currentHlsUrlRef.current = currentStream.hlsUrl;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(currentStream.hlsUrl);
      hls.attachMedia(video);
      video.muted = true;

      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
    } else {
      video.src = currentStream.hlsUrl;
      video.muted = true;
      video.play().catch(() => {});
    }

    return () => cleanup();
  }, [currentStream]);

  return {
    videoRef,
    currentStream,
    viewerCount,
    connection: hubRef.current,
  };
};

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

  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/streamHub`;

  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);

  // === SignalR connection ===
  useEffect(() => {
    if (!nickname || !userData?.id) return;

    if (!userTokenRef.current) userTokenRef.current = createGuestKey();

    // Если соединение уже есть, не создаём новое
    if (hubRef.current) return;

    const hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl).withAutomaticReconnect().build();

    hubRef.current = hubConnection;

    const handleStreamJoined = (streamInfo: any) => {
      if (!streamInfo) {
        setCurrentStream(null);
        return;
      }
      const streamId = streamInfo.streamId ?? streamInfo.StreamId ?? 0;
      setCurrentStream((prev) =>
        prev?.streamId === streamId
          ? prev
          : {
              streamId,
              streamName: streamInfo.streamName ?? streamInfo.StreamName ?? 'Unknown',
              streamerId: streamInfo.streamerId ?? streamInfo.StreamerId ?? 0,
              streamerName: streamInfo.streamerName ?? streamInfo.StreamerName ?? 'Unknown',
              tags: streamInfo.tags ?? [],
              previewUrl: streamInfo.previewUrl ?? null,
              hlsUrl: streamInfo.hlsUrl ?? streamInfo.HlsUrl ?? '',
              totalViews: streamInfo.totalViews ?? 0,
              startedAt: streamInfo.startedAt ?? new Date().toISOString(),
              isLive: streamInfo.isLive ?? streamInfo.IsLive ?? false,
            }
      );
    };

    const handleUpdateViewerCount = (count: number) => setViewerCount(count);

    const handleStreamStatusChanged = (data: any) => {
      const status = (data?.status ?? data?.Status ?? '').toString().toLowerCase();

      if (['live', 'started', 'on'].includes(status) && data?.stream) {
        const stream = data.stream;
        setCurrentStream((prev) =>
          prev?.streamId === stream.streamId
            ? prev
            : {
                streamId: stream.streamId ?? stream.StreamId ?? 0,
                streamName: stream.streamName ?? stream.StreamName ?? 'Unknown',
                streamerId: stream.streamerId ?? stream.StreamerId ?? 0,
                streamerName: stream.streamerName ?? stream.streamerName ?? 'Unknown',
                tags: stream.tags ?? [],
                previewUrl: stream.previewUrl ?? null,
                hlsUrl: stream.hlsUrl ?? stream.HlsUrl ?? '',
                totalViews: stream.totalViews ?? 0,
                startedAt: stream.startedAt ?? new Date().toISOString(),
                isLive: true,
              }
        );
        return;
      }

      if (['offline', 'stopped'].includes(status)) {
        setCurrentStream(null);
      }
    };

    hubConnection.on('StreamJoined', handleStreamJoined);
    hubConnection.on('UpdateViewerCount', handleUpdateViewerCount);
    hubConnection.on('StreamStatusChanged', handleStreamStatusChanged);

    hubConnection
      .start()
      .then(() => {
        console.log('Connected to StreamHub');
        hubConnection.invoke('JoinStream', nickname, userTokenRef.current).catch(console.error);

        // Один интервал для обновления статуса
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            if (hubConnection.state === signalR.HubConnectionState.Connected) {
              hubConnection.invoke('UpdateStreamStatus', userData.id).catch(console.error);
            }
          }, 15000);
        }
      })
      .catch(console.error);

    return () => {
      // Cleanup
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (hubRef.current) {
        hubRef.current.off('StreamJoined');
        hubRef.current.off('UpdateViewerCount');
        hubRef.current.off('StreamStatusChanged');
        hubRef.current.stop().catch(() => {});
        hubRef.current = null;
      }
    };
  }, [nickname, hubUrl, userData?.id]);

  // === HLS player ===
  useEffect(() => {
    const video = videoRef.current;

    const cleanupPlayer = () => {
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

    if (!currentStream || !video || !currentStream.isLive || !currentStream.hlsUrl) {
      cleanupPlayer();
      return;
    }

    // Если стрим или URL не поменялись — ничего не делаем
    if (currentStreamIdRef.current === currentStream.streamId && currentHlsUrlRef.current === currentStream.hlsUrl) {
      return;
    }

    cleanupPlayer();

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

    return () => cleanupPlayer();
  }, [currentStream]);

  return { videoRef, currentStream, viewerCount, connection: hubRef.current };
};

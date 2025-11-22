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

  useEffect(() => {
    if (!nickname || !userData?.id) return;
    if (!userTokenRef.current) userTokenRef.current = createGuestKey();

    const hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl).withAutomaticReconnect().build();

    setConnection(hubConnection);

    let interval: NodeJS.Timer | undefined;

    const handleStreamJoined = (streamInfo: IStream | null) => {
      if (!streamInfo || !streamInfo.isLive) return;
      setCurrentStream(streamInfo);
    };

    const handleUpdateViewerCount = (count: number) => {
      setViewerCount(count);
    };

    const handleStreamStatusChanged = (data: any) => {
      if (!data) return;

      const stream = data.Stream;
      const status = (data?.status ?? data?.Status ?? '').toString().toLowerCase();

      // если статус "live" и stream совпадает с текущим или еще не установлен
      if ((status === 'live' || status === 'started' || status === 'on') && stream) {
        if (!currentStream || stream.streamId === currentStream.streamId) {
          setCurrentStream({
            streamId: stream.streamId ?? 0,
            streamName: stream.streamName ?? 'Unknown',
            streamerId: stream.streamerId ?? 0,
            streamerName: stream.streamerName ?? 'Unknown',
            tags: stream.tags ?? [],
            previewlUrl: stream.previewUrl ?? null,
            hlsUrl: stream.hlsUrl ?? '',
            totalViews: stream.totalViews ?? 0,
            startedAt: stream.startedAt ?? new Date().toISOString(),
            isLive: true,
          });
        }
        return;
      }

      // если статус "offline" и streamId совпадает с текущим стримом — выключаем
      if ((status === 'offline' || status === 'stopped') && (!stream || stream.streamId === currentStream?.streamId)) {
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

        if (userData.id) {
          hubConnection.invoke('UpdateStreamStatus', userData.id).catch(console.error);
          interval = setInterval(() => {
            if (hubConnection.state === signalR.HubConnectionState.Connected) {
              hubConnection.invoke('UpdateStreamStatus', userData.id).catch(console.error);
            }
          }, 15000);
        }
      })
      .catch(console.error);

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
    };
  }, [nickname, hubUrl, userData?.id, currentStream]);

  // HLS player
  useEffect(() => {
    const video = videoRef.current;

    const cleanupPlayer = () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.stopLoad();
        } catch {}
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
      currentHlsUrlRef.current = null;

      if (video) {
        try {
          video.pause();
        } catch {}
        try {
          video.removeAttribute('src');
          video.load();
        } catch {}
      }
    };

    if (!currentStream || !video || !currentStream.isLive || !currentStream.hlsUrl) {
      cleanupPlayer();
      return;
    }

    if (currentHlsUrlRef.current === currentStream.hlsUrl) return;

    cleanupPlayer();

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      currentHlsUrlRef.current = currentStream.hlsUrl;

      hls.loadSource(currentStream.hlsUrl);
      hls.attachMedia(video);
      video.muted = true;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data?.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
          else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
          else cleanupPlayer();
        }
      });
    } else {
      video.src = currentStream.hlsUrl;
      video.muted = true;
      video.play().catch(() => {});
      currentHlsUrlRef.current = currentStream.hlsUrl;
    }

    return () => cleanupPlayer();
  }, [currentStream]);

  return { videoRef, currentStream, viewerCount, connection };
};

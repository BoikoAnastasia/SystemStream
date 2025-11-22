import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import Hls from 'hls.js';
import { createGuestKey } from '../../utils/createGuestKey';
import { IStream } from '../../types/share';

export const useStreamHub = ({ nickname }: { nickname: string | undefined }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const userTokenRef = useRef<string | null>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/streamHub`;

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [lastHlsUrl, setLastHlsUrl] = useState<string | null>(null);

  // === SignalR connection ===
  useEffect(() => {
    if (!nickname) return;

    if (!userTokenRef.current) userTokenRef.current = createGuestKey();

    const hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl).withAutomaticReconnect().build();

    setConnection(hubConnection);

    hubConnection
      .start()
      .then(() => {
        console.log('Connected to StreamHub');

        // StreamJoined
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

        // Обновление зрителей
        hubConnection.on('UpdateViewerCount', (count: number) => {
          setViewerCount(count);
        });

        // StreamStatusChanged
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

        hubConnection.invoke('JoinStream', nickname, userTokenRef.current).catch(console.error);
      })
      .catch(console.error);

    return () => {
      if (hubConnection.state === signalR.HubConnectionState.Connected) {
        hubConnection.invoke('LeaveStream', nickname, userTokenRef.current).finally(() => hubConnection.stop());
      }
    };
  }, [nickname, hubUrl]);

  // === HLS player ===
  useEffect(() => {
    if (!currentStream?.isLive || !currentStream.hlsUrl || !videoRef.current) {
      // Очистка плеера при оффлайне
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (videoRef.current) videoRef.current.src = '';
      setLastHlsUrl(null);
      return;
    }

    if (currentStream.hlsUrl === lastHlsUrl) return;
    setLastHlsUrl(currentStream.hlsUrl);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(currentStream.hlsUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current?.play());
      hlsRef.current = hls;
    } else {
      videoRef.current.src = currentStream.hlsUrl;
      videoRef.current.play().catch(console.error);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentStream?.hlsUrl, currentStream?.isLive]);

  return { videoRef, currentStream, viewerCount, connection };
};

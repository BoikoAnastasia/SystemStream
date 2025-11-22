import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import Hls from 'hls.js';
// utils
import { createGuestKey } from '../../utils/createGuestKey';

export const useStreamHub = ({ nickname }: { nickname: string | undefined }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const userTokenRef = useRef<string>(null);
  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/streamHub`;

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [currentStream, setCurrentStream] = useState<any>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);

  // SignalR
  useEffect(() => {
    if (!nickname) return;

    if (!userTokenRef.current) {
      userTokenRef.current = createGuestKey();
    }

    const hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl).withAutomaticReconnect().build();

    setConnection(hubConnection);

    hubConnection
      .start()
      .then(() => {
        console.log('Connected to StreamHub');

        hubConnection.on('StreamJoined', (streamInfo) => {
          console.log('Stream joined:', streamInfo);
          setCurrentStream(streamInfo);
        });

        hubConnection.on('UpdateViewerCount', (count) => {
          setViewerCount(count);
        });

        hubConnection.on('StreamStatusChanged', (data) => {
          console.log('Stream status changed:', data);

          if (data.Status === 'Live') {
            setCurrentStream(data.Stream);
          } else {
            setCurrentStream({ isLive: false });
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

  // HLS
  useEffect(() => {
    if (!currentStream?.hlsUrl || !videoRef.current) return;

    if (hlsRef.current && hlsRef.current.url === currentStream.hlsUrl) return;

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
      videoRef.current.play();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentStream?.hlsUrl]);

  return { videoRef, currentStream, viewerCount, connection };
};

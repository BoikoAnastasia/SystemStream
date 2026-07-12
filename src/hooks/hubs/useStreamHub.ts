import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { createGuestKey } from '../../utils/createGuestKey';
import { IStream } from '../../types/share';
import { getCookie } from '../../utils/cookieFunctions';
import { mapStreamFromHub } from './streamHub.utils';

interface UseStreamHubProps {
  nickname: string | undefined;
  userData: { id: number } | null;
}

const STATUS_POLL_MS = 8000;

export const useStreamHub = ({ nickname, userData }: UseStreamHubProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hubRef = useRef<signalR.HubConnection | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const userTokenRef = useRef<string | null>(null);
  const nicknameRef = useRef<string | undefined>(nickname);
  const streamerIdRef = useRef<number | undefined>(userData?.id);
  const joinedNicknameRef = useRef<string | null>(null);

  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  const hubUrl = `${process.env.REACT_APP_API_LOCAL}/hubs/streamHub`;

  nicknameRef.current = nickname;
  streamerIdRef.current = userData?.id;

  const handlersRef = useRef({
    handleStreamJoined: (_streamInfo: unknown) => {},
    handleUpdateViewerCount: (_count: number) => {},
    handleStreamStatusChanged: (_data: unknown) => {},
  });

  const bindHandlers = (hub: signalR.HubConnection) => {
    handlersRef.current.handleStreamJoined = (streamInfo: unknown) => {
      setCurrentStream(mapStreamFromHub(streamInfo as Record<string, unknown>));
    };

    handlersRef.current.handleUpdateViewerCount = (count: number) => {
      setViewerCount(count);
    };

    handlersRef.current.handleStreamStatusChanged = (data: any) => {
      const status = String(data?.status ?? data?.Status ?? '').toLowerCase();
      const streamPayload = data?.stream ?? data?.Stream;
      const mapped = mapStreamFromHub(streamPayload as Record<string, unknown> | undefined);

      if (mapped) {
        setCurrentStream(mapped);
        const nick = nicknameRef.current;
        const hubConn = hubRef.current;
        if (nick && hubConn?.state === signalR.HubConnectionState.Connected) {
          hubConn.invoke('JoinStream', nick, userTokenRef.current).catch(console.error);
        }
        return;
      }

      if (['live', 'started', 'on'].includes(status) && streamPayload) {
        handlersRef.current.handleStreamJoined(streamPayload);
        return;
      }

      if (['offline', 'stopped'].includes(status)) {
        setCurrentStream(null);
      }
    };

    hub.off('StreamJoined', handlersRef.current.handleStreamJoined);
    hub.off('UpdateViewerCount', handlersRef.current.handleUpdateViewerCount);
    hub.off('StreamStatusChanged', handlersRef.current.handleStreamStatusChanged);

    hub.on('StreamJoined', handlersRef.current.handleStreamJoined);
    hub.on('UpdateViewerCount', handlersRef.current.handleUpdateViewerCount);
    hub.on('StreamStatusChanged', handlersRef.current.handleStreamStatusChanged);
  };

  const joinStream = (hub: signalR.HubConnection) => {
    const nick = nicknameRef.current;
    const streamerId = streamerIdRef.current;
    if (!nick) return;

    hub.invoke('JoinStream', nick, userTokenRef.current).catch(console.error);
    joinedNicknameRef.current = nick;

    if (streamerId) {
      hub.invoke('UpdateStreamStatus', streamerId).catch(console.error);
    }
  };

  const ensureStatusPoll = (hub: signalR.HubConnection) => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const streamerId = streamerIdRef.current;
      if (hub.state === signalR.HubConnectionState.Connected && streamerId) {
        hub.invoke('UpdateStreamStatus', streamerId).catch(console.error);
      }
    }, STATUS_POLL_MS);
  };

  useEffect(() => {
    if (!nickname || !userData?.id) return;

    const nicknameChanged = joinedNicknameRef.current !== null && joinedNicknameRef.current !== nickname;
    if (nicknameChanged || joinedNicknameRef.current === null) {
      setCurrentStream(null);
      setViewerCount(0);
    }

    if (!userTokenRef.current) {
      userTokenRef.current = createGuestKey();
    }

    const existingHub = hubRef.current;
    if (existingHub && existingHub.state !== signalR.HubConnectionState.Disconnected) {
      bindHandlers(existingHub);
      joinStream(existingHub);
      setConnection(existingHub);
      ensureStatusPoll(existingHub);
      return;
    }

    const hub = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => getCookie('tokenData') ?? '',
      })
      .withAutomaticReconnect()
      .build();

    hubRef.current = hub;
    bindHandlers(hub);

    hub
      .start()
      .then(() => {
        setConnection(hub);
        joinStream(hub);
        ensureStatusPoll(hub);
      })
      .catch(console.error);

    hub.onreconnected(() => {
      setConnection(hub);
      joinStream(hub);
    });

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
      joinedNicknameRef.current = null;
      setConnection(null);
    };
  }, [nickname, userData?.id, hubUrl]);

  return {
    videoRef,
    currentStream,
    viewerCount,
    connection,
  };
};

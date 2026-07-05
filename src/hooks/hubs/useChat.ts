import * as signalR from '@microsoft/signalr';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IChatMessage, IProfile } from '../../types/share';
import { CHAT_MAX_MESSAGE_LENGTH } from '../../components/chat/chat.constants';
import { mapChatError, normalizeChatMessage } from '../../components/chat/chat.utils';

type LocalChatMessage = IChatMessage & { clientId?: string };

export const useChat = (hub: signalR.HubConnection | null, streamNickname?: string, profile?: IProfile | null) => {
  const [messages, setMessages] = useState<LocalChatMessage[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [slowModeSeconds, setSlowModeSeconds] = useState(0);
  const [canManageChat, setCanManageChat] = useState(false);
  const [bannedUserIds, setBannedUserIds] = useState<number[]>([]);
  const [inputRestore, setInputRestore] = useState<string | null>(null);
  const lastSuccessfulSentAtRef = useRef(0);
  const slowModeSecondsRef = useRef(0);
  const canManageChatRef = useRef(false);

  const clearChatError = useCallback(() => setChatError(null), []);

  const consumeInputRestore = useCallback(() => setInputRestore(null), []);

  useEffect(() => {
    slowModeSecondsRef.current = slowModeSeconds;
  }, [slowModeSeconds]);

  const getSlowModeWaitSeconds = useCallback(() => {
    if (canManageChatRef.current) return null;

    const limit = slowModeSecondsRef.current;
    if (limit <= 0 || lastSuccessfulSentAtRef.current <= 0) return null;

    const elapsed = (Date.now() - lastSuccessfulSentAtRef.current) / 1000;
    if (elapsed >= limit) return null;

    return Math.ceil(limit - elapsed);
  }, []);

  const syncSlowModeFromServer = useCallback((waitSeconds: number) => {
    const limit = slowModeSecondsRef.current;
    if (limit <= 0) return;
    lastSuccessfulSentAtRef.current = Date.now() - (limit - waitSeconds) * 1000;
  }, []);

  useEffect(() => {
    if (!hub) {
      setIsReady(false);
      setCanManageChat(false);
      setBannedUserIds([]);
      canManageChatRef.current = false;
      return;
    }

    const handleReceive = (raw: Record<string, unknown>) => {
      const msg = normalizeChatMessage(raw);

      if (profile && msg.userId === profile.id) {
        lastSuccessfulSentAtRef.current = Date.now();
      }

      setMessages((prev) => {
        const withoutOptimistic = prev.filter(
          (item) => !(item.clientId && item.userId === msg.userId && item.text === msg.text)
        );

        if (msg.id && withoutOptimistic.some((item) => item.id === msg.id)) {
          return withoutOptimistic;
        }

        const isDuplicate = withoutOptimistic.some(
          (item) => !msg.id && item.userId === msg.userId && item.text === msg.text && item.timestamp === msg.timestamp
        );

        return isDuplicate ? withoutOptimistic : [...withoutOptimistic, msg];
      });
    };

    const handleHistory = (rawMessages: Record<string, unknown>[]) => {
      setMessages(rawMessages.map(normalizeChatMessage));
    };

    const handleError = (code: string) => {
      const errorCode = String(code);
      setChatError(mapChatError(errorCode));

      if (errorCode.startsWith('ChatSlowMode:')) {
        const waitSeconds = Number(errorCode.split(':')[1]);
        if (!Number.isNaN(waitSeconds)) {
          syncSlowModeFromServer(waitSeconds);
        }
      }

      setMessages((prev) => {
        if (!profile) return prev;
        for (let i = prev.length - 1; i >= 0; i--) {
          if (prev[i].clientId && prev[i].userId === profile.id) {
            if (prev[i].text) {
              setInputRestore(prev[i].text);
            }
            return [...prev.slice(0, i), ...prev.slice(i + 1)];
          }
        }
        return prev;
      });
    };

    const handleSettings = (data: Record<string, unknown>) => {
      const seconds = data?.slowModeSeconds ?? data?.SlowModeSeconds;
      if (typeof seconds === 'number') {
        setSlowModeSeconds(Math.max(0, seconds));
      }

      const manage = data?.canManageChat ?? data?.CanManageChat;
      if (typeof manage === 'boolean') {
        canManageChatRef.current = manage;
        setCanManageChat(manage);
      }

      const banned = data?.bannedUserIds ?? data?.BannedUserIds;
      if (Array.isArray(banned)) {
        setBannedUserIds(banned.map((id) => Number(id)).filter((id) => id > 0));
      }
    };

    const handleUserBanned = (data: Record<string, unknown>) => {
      const userId = Number(data?.userId ?? data?.UserId ?? 0);
      if (!userId) return;
      setBannedUserIds((prev) => (prev.includes(userId) ? prev : [...prev, userId]));

      setMessages((prev) =>
        prev.map((item) => {
          if (item.userId !== userId || item.isDeleted) return item;

          const deletedText = canManageChatRef.current ? item.text : undefined;
          return {
            ...item,
            isDeleted: true,
            text: '',
            deletedText,
          };
        })
      );

      if (profile && profile.id === userId) {
        canManageChatRef.current = false;
        setCanManageChat(false);
        setChatError(mapChatError('ChatBanned'));
      }

      if (data?.removedFromTeam ?? data?.RemovedFromTeam) {
        window.dispatchEvent(
          new CustomEvent('stream-team-member-removed', {
            detail: { userId },
          })
        );
      }
    };

    const handleUserUnbanned = (data: Record<string, unknown>) => {
      const userId = Number(data?.userId ?? data?.UserId ?? 0);
      if (!userId) return;
      setBannedUserIds((prev) => prev.filter((id) => id !== userId));
    };

    const handleMessageDeleted = (data: Record<string, unknown>) => {
      const messageId = String(data?.messageId ?? data?.MessageId ?? '');
      if (!messageId) return;

      const eventDeletedText = String(data?.deletedText ?? data?.DeletedText ?? '');

      setMessages((prev) =>
        prev.map((item) => {
          if (item.id !== messageId) return item;

          const deletedText = canManageChatRef.current ? eventDeletedText || item.text : undefined;

          return {
            ...item,
            isDeleted: true,
            text: '',
            deletedText,
          };
        })
      );
    };

    const handleUserTimedOut = (_data: Record<string, unknown>) => {
      // broadcast only — targeted user gets block on next send
    };

    const handleReconnected = () => {
      hub.invoke('LoadChatHistory').catch(console.error);
    };

    hub.on('ReceiveChatMessage', handleReceive);
    hub.on('LoadChatHistory', handleHistory);
    hub.on('Error', handleError);
    hub.on('ChatSettingsChanged', handleSettings);
    hub.on('ChatMessageDeleted', handleMessageDeleted);
    hub.on('ChatUserTimedOut', handleUserTimedOut);
    hub.on('ChatUserBanned', handleUserBanned);
    hub.on('ChatUserUnbanned', handleUserUnbanned);
    hub.onreconnected(handleReconnected);
    setIsReady(hub.state === signalR.HubConnectionState.Connected);

    return () => {
      hub.off('ReceiveChatMessage', handleReceive);
      hub.off('LoadChatHistory', handleHistory);
      hub.off('Error', handleError);
      hub.off('ChatSettingsChanged', handleSettings);
      hub.off('ChatMessageDeleted', handleMessageDeleted);
      hub.off('ChatUserTimedOut', handleUserTimedOut);
      hub.off('ChatUserBanned', handleUserBanned);
      hub.off('ChatUserUnbanned', handleUserUnbanned);
      setIsReady(false);
    };
  }, [hub, streamNickname, profile, syncSlowModeFromServer]);

  const sendMessage = useCallback(
    async (text: string): Promise<boolean> => {
      if (!hub || !isReady || !streamNickname || !profile) return false;

      const trimmed = text.trim();
      if (!trimmed) {
        setChatError(mapChatError('ChatMessageEmpty'));
        return false;
      }

      if (trimmed.length > CHAT_MAX_MESSAGE_LENGTH) {
        setChatError(mapChatError('ChatMessageTooLong'));
        return false;
      }

      const slowModeWait = getSlowModeWaitSeconds();
      if (slowModeWait !== null) {
        setChatError(mapChatError(`ChatSlowMode:${slowModeWait}`));
        return false;
      }

      setChatError(null);

      const clientId = `local-${Date.now()}`;
      const optimistic: LocalChatMessage = {
        id: '',
        userId: profile.id,
        username: profile.nickname,
        text: trimmed,
        role: 'User',
        timestamp: new Date().toISOString(),
        offsetSeconds: 0,
        clientId,
      };

      setMessages((prev) => [...prev, optimistic]);

      try {
        await hub.invoke('SendChatMessage', trimmed);
        return true;
      } catch (error) {
        setMessages((prev) => prev.filter((msg) => msg.clientId !== clientId));
        setInputRestore(trimmed);
        setChatError('Не удалось отправить сообщение');
        console.error(error);
        return false;
      }
    },
    [hub, isReady, streamNickname, profile, getSlowModeWaitSeconds]
  );

  const deleteMessage = useCallback(
    async (messageId: string) => {
      if (!hub || !isReady || !messageId) return;

      try {
        await hub.invoke('DeleteChatMessage', messageId);
      } catch (error) {
        setChatError(mapChatError('ChatDeleteFailed'));
        console.error(error);
      }
    },
    [hub, isReady]
  );

  const timeoutUser = useCallback(
    async (targetUserId: number, seconds: number) => {
      if (!hub || !isReady || !targetUserId) return;

      try {
        await hub.invoke('TimeoutChatUser', targetUserId, seconds);
      } catch (error) {
        setChatError(mapChatError('ChatTimeoutFailed'));
        console.error(error);
      }
    },
    [hub, isReady]
  );

  const banUser = useCallback(
    async (targetUserId: number) => {
      if (!hub || !isReady || !targetUserId) return;

      try {
        await hub.invoke('BanChatUser', targetUserId);
      } catch (error) {
        setChatError(mapChatError('ChatBanFailed'));
        console.error(error);
      }
    },
    [hub, isReady]
  );

  const unbanUser = useCallback(
    async (targetUserId: number) => {
      if (!hub || !isReady || !targetUserId) return;

      try {
        await hub.invoke('UnbanChatUser', targetUserId);
      } catch (error) {
        setChatError(mapChatError('ChatUnbanFailed'));
        console.error(error);
      }
    },
    [hub, isReady]
  );

  const setSlowMode = useCallback(
    async (seconds: number) => {
      if (!hub || !isReady) return;

      setChatError(null);

      try {
        await hub.invoke('SetChatSlowMode', seconds);
        setSlowModeSeconds(Math.max(0, seconds));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setChatError(
          message.includes('SetChatSlowMode') || message.includes('not found')
            ? 'Slow mode недоступен — перезапустите backend'
            : mapChatError('ChatSlowModeFailed')
        );
        console.error(error);
      }
    },
    [hub, isReady]
  );

  return {
    messages,
    sendMessage,
    deleteMessage,
    timeoutUser,
    banUser,
    unbanUser,
    chatError,
    clearChatError,
    slowModeSeconds,
    setSlowMode,
    canManageChat,
    bannedUserIds,
    inputRestore,
    consumeInputRestore,
  };
};

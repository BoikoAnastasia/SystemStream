import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// microsoft
import { HubConnectionState } from '@microsoft/signalr';
// context
import { useNickname } from './NicknameContext';
// hooks
import { useStreamHub } from '../hooks/useStreamHub';
// types
import { INotification, IStream } from '../types/share';

interface NotificationContextValue {
  notifications: INotification[];
  addNotification: (n: INotification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { nickname } = useNickname();
  const { connection, isConnected } = useStreamHub(nickname || undefined);

  useEffect(() => {
    if (!connection || connection.state !== HubConnectionState.Connected) return;

    const handler = (streamData: IStream) => {
      addNotification({
        id: Date.now(),
        type: 'stream_start',
        title: 'Новый стрим!',
        message: `${streamData.streamerName} начал трансляцию: ${streamData.streamName}`,
      });
    };

    connection.on('StreamerStartedStream', handler);

    return () => {
      connection.off('StreamerStartedStream', handler);
    };
  }, [connection, isConnected, nickname]);

  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};

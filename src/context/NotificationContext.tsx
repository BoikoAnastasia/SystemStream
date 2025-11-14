import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNickname } from './NicknameContext';
import { useStreamHub } from '../hooks/useStreamHub';
import { INotification } from '../types/share';

interface NotificationContextValue {
  notifications: INotification[];
  addNotification: (n: INotification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { nickname } = useNickname();
  const { currentStream } = useStreamHub(nickname || undefined);

  // Отслеживаем появление нового стрима
  const [lastStreamId, setLastStreamId] = useState<Number | null>(null);

  useEffect(() => {
    if (!currentStream) return;

    if (currentStream.streamId !== lastStreamId) {
      addNotification({
        id: Date.now(),
        type: 'stream_start',
        title: 'Новый стрим!',
        message: `${currentStream.streamerName} начал трансляцию: ${currentStream.streamName}`,
        link: currentStream.streamerName,
      });
      setLastStreamId(currentStream.streamId);
    }
  }, [currentStream, lastStreamId]);

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

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { INotification } from '../types/share';
import { useNotificationHub } from '../hooks/hubs/useNotificationHub';

interface NotificationContextValue {
  notifications: INotification[];
  addNotification: (n: INotification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = useCallback((notification: INotification) => {
    console.log('Adding notification:', notification);
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Подключаем SignalR хук
  useNotificationHub(addNotification);

  useEffect(() => {
    console.log('Provider notifications updated:', notifications);
  }, [notifications]);

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

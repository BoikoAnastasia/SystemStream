import { createContext, ReactNode, useContext, useState } from 'react';
// hooks
import { useNotificationHub } from '../hooks/hubs/useNotificationHub';
// types
import { INotification } from '../types/share';

interface NotificationContextValue {
  notifications: INotification[];
  addNotification: (n: INotification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useNotificationHub(addNotification);

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

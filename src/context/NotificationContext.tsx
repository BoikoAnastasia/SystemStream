import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// context
import { useNickname } from './NicknameContext';
// hooks
import { useStreamHub } from '../hooks/useStreamHub';
// types
import { INotification } from '../types/share';

interface NotificationContextValue {
  notifications: INotification[];
  addNotification: (n: INotification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { nickname } = useNickname();
  const { currentStream } = useStreamHub({ nickname: nickname || undefined });

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [lastStreamId, setLastStreamId] = useState<Number | null>(null);

  useEffect(() => {
    if (!currentStream || !currentStream.isLive || !currentStream.streamId || currentStream.streamerName === nickname)
      return;

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
  }, [currentStream, lastStreamId, nickname]);

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

// TODO Добавить когда сделают hub с подписками
// import { useEffect, useState, useRef } from "react";
// import * as signalR from "@microsoft/signalr";
// import { getUserSubscriptions } from "../api/user";

// export const NotificationProvider = ({ children }) => {
//     const [notifications, setNotifications] = useState([]);
//     const connectionRef = useRef(null);

//     useEffect(() => {
//         async function initNotifications() {
//             const subs = await getUserSubscriptions(); // [12, 44, 91]

//             const hub = new signalR.HubConnectionBuilder()
//                 .withUrl(`/hubs/notifications`)
//                 .withAutomaticReconnect()
//                 .build();

//             connectionRef.current = hub;

//             hub.on("StreamStarted", (data) => {
//                 addNotification({
//                     id: Date.now(),
//                     type: "stream_start",
//                     title: "Стример в эфире!",
//                     message: `${data.streamerName} начал стрим: ${data.streamName}`,
//                     link: data.streamerName,
//                 });
//             });

//             await hub.start();

//             // подписка на всех стримеров
//             for (const id of subs) {
//                 await hub.invoke("SubscribeToStreamer", id);
//             }
//         }

//         initNotifications();
//     }, []);

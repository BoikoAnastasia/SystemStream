import * as signalR from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { IChatMessage } from '../../types/share';

export const useChat = (hub: signalR.HubConnection | null, streamNickname?: string) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!hub) return;

    const handleRecieve = (msg: IChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleStory = (msgs: IChatMessage[]) => {
      setMessages(msgs);
    };

    hub.on('ReceiveChatMessage', handleRecieve);
    hub.on('LoadChatHistory', handleStory);

    setIsReady(true);

    return () => {
      hub.off('ReceiveChatMessage', handleRecieve);
      hub.off('LoadChatHistory', handleStory);
    };
  }, [hub]);

  const sendMessage = async (text: string) => {
    if (!hub || !isReady || !streamNickname) return;
    try {
      await hub.invoke('SendChatMessage', text);
    } catch (error) {
      console.error(error);
    }
  };
  return { messages, sendMessage };
};

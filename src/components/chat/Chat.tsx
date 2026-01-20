import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
// components
import { ChatCard } from './components/card/ChatCard';
// utils
import { getRandomColor } from '../../utils/getRandomColor';
//mui
import { Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// styles
import {
  StyledChatContainer,
  StyledChatContainerMessages,
  StyledChatHeader,
  StyledChatList,
  StyledChatTextField,
} from './StyledChat';
// types
import { IChatMessage } from '../../types/share';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

export const Chat = ({
  isOpen,
  setIsOpen,
  messages,
  sendMessage,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messages: IChatMessage[];
  sendMessage: (text: string) => void;
}) => {
  const { isMobile } = useDeviceDetect();

  const listRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState('');
  const colorMap = useRef<{ [key: string]: string }>({});
  const { isAuth } = useAppSelector((state) => state.user);

  const getUserColor = (nickname: string) => {
    if (!colorMap.current[nickname]) {
      colorMap.current[nickname] = getRandomColor();
    }
    return colorMap.current[nickname];
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  return (
    <StyledChatContainer>
      <StyledChatHeader>
        {!isMobile ? (
          <Button onClick={() => setIsOpen(!isOpen)}>
            <FirstPageIcon
              fontSize="large"
              sx={{ color: 'var(--white)', minWidth: 'auto', transform: 'rotate(-180deg)', transition: 'all .3s ease' }}
            />
          </Button>
        ) : (
          <></>
        )}
        <Box sx={{ fontSize: '20px', padding: isMobile ? '10px' : '' }}>Чат стрима</Box>
      </StyledChatHeader>
      {/* Chat */}
      <StyledChatList ref={listRef}>
        {messages.length > 0 &&
          messages.map((msg: IChatMessage) => (
            <ChatCard customColor={getUserColor(msg.username)} msg={msg} key={msg.userId} />
          ))}
      </StyledChatList>
      {/* Message box */}
      <StyledChatContainerMessages>
        <StyledChatTextField
          placeholder={isAuth ? 'Введите сообщение' : 'Только для авторизованных'}
          autoComplete="false"
          disabled={!isAuth}
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSend()}
        />
        <Button
          disabled={!isAuth}
          onClick={handleSend}
          sx={{ position: 'absolute', right: '0', borderRadius: '12px', minWidth: 'auto' }}
        >
          <SendIcon sx={{ color: 'var(--white)' }} />
        </Button>
      </StyledChatContainerMessages>
    </StyledChatContainer>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
// components
import { ChatCard } from './components/ChatCard';
// utils
import { getRandomColor } from '../../utils/getRandomColor';
//mui
import { Box, Button } from '@mui/material';
// styles
import { StyledChatList, StyledChatTextField } from '../StylesComponents';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import SendIcon from '@mui/icons-material/Send';
// types
import { IChatMessage } from '../../types/share';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        minWidth: '250px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--sidebar)' }}>
        <Button onClick={() => setIsOpen(!isOpen)}>
          <FirstPageIcon
            fontSize="large"
            sx={{ color: 'var(--white)', minWidth: 'auto', transform: 'rotate(-180deg)', transition: 'all .3s ease' }}
          />
        </Button>
        <Box sx={{ fontSize: '20px' }}>Чат стрима</Box>
      </Box>
      {/* Chat */}
      <StyledChatList ref={listRef}>
        {messages.length > 0 &&
          messages.map((msg: IChatMessage) => (
            <ChatCard customColor={getUserColor(msg.username)} msg={msg} key={msg.userId} />
          ))}
      </StyledChatList>
      {/* Message box */}
      <Box sx={{ position: 'relative', display: 'flex', gap: '12px', alignItems: 'center', marginTop: '20px' }}>
        <StyledChatTextField
          placeholder={isAuth ? 'Введите сообщение' : 'Только для авторизованных'}
          autoComplete="false"
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
      </Box>
    </Box>
  );
};

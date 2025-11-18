import { useEffect, useRef, useState } from 'react';
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
import { IMessage } from '../../types/share';

export const Chat = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listMessages, setIistMessages] = useState<IMessage[]>([
    {
      id: '1',
      nickname: 'Ethan',
      message: 'Привет, София',
      currentUser: false,
      avatar: './img/users/user-01.jpg',
    },
    {
      id: '1',
      nickname: 'Ethan',
      message: 'Привет, София',
      currentUser: false,
      avatar: './img/users/user-01.jpg',
    },
    {
      id: '1',
      nickname: 'Ethan',
      message: 'Привет, София',
      currentUser: false,
      avatar: './img/users/user-01.jpg',
    },
    {
      id: '1',
      nickname: 'Ethan',
      message: 'Привет, София',
      currentUser: false,
      avatar: './img/users/user-01.jpg',
    },
    {
      id: '2',
      nickname: 'Olivia',
      message: "I'm  rooting  for  you!",
      currentUser: false,
      avatar: './img/users/user-02.jpg',
    },
    {
      id: '2',
      nickname: 'Olivia',
      message: 'fsdfsdfsdfsdffsdfsdfsdfsdffsdfsdfsdfsdffsdfsdfsdfsdf',
      currentUser: false,
      avatar: './img/users/user-02.jpg',
    },
    {
      id: '3',
      nickname: 'Sophia',
      message: 'Thanks  guys!  I  appreciate  the  support.',
      currentUser: true,
      avatar: './img/users/user-03.jpg',
    },
  ]);
  const [message, setMessage] = useState('');
  const colorMap = useRef<{ [key: string]: string }>({});

  const getUserColor = (nickname: string) => {
    if (!colorMap.current[nickname]) {
      colorMap.current[nickname] = getRandomColor();
    }
    return colorMap.current[nickname];
  };

  const addNewMessage = () => {
    const newM = {
      id: '1',
      nickname: 'Ethan',
      message: message,
      currentUser: true,
      avatar: './img/users/user-04.jpg',
    };
    setIistMessages((prev) => [...prev, newM]);
    setMessage('');
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      addNewMessage();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [listMessages]);

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
      <StyledChatList ref={listRef}>
        {listMessages &&
          listMessages.map((message, index) => (
            <ChatCard customColor={getUserColor(message.nickname)} msg={message} key={index} />
          ))}
      </StyledChatList>
      <Box sx={{ position: 'relative', display: 'flex', gap: '12px', alignItems: 'center', marginTop: '20px' }}>
        <StyledChatTextField
          placeholder="Введите сообщение"
          autoComplete="false"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} sx={{ position: 'absolute', right: '0', borderRadius: '12px', minWidth: 'auto' }}>
          <SendIcon sx={{ color: 'var(--white)' }} />
        </Button>
      </Box>
    </Box>
  );
};

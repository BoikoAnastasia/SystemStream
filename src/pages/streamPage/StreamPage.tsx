import { useState } from 'react';
// components
import { Chat } from '../../components/chat/Chat';
import { HeaderStreamPage } from './components/headerStreamPage/HeaderStreamPage';
// mui
import { Box, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
// types
import { IChatMessage, IStream } from '../../types/share';
import { VideoPlayer } from '../../components/videoPlayer/VideoPlayer';

export const StreamPage = ({
  videoRef,
  streamInfo,
  viewerCount,
  messages,
  sendMessage,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  streamInfo: IStream | null;
  viewerCount: number;
  messages: IChatMessage[];
  sendMessage: (text: string) => void;
}) => {
  const { isMobile } = useDeviceDetect();
  const [isOpen, setIsOpen] = useState(true);

  const videoContainerFlex = isOpen && !isMobile ? '0 1 70%' : '0 1 100%';
  const chatFlex = isOpen ? '0 1 30%' : '0 1 5%';

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '500px',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(88,101,242,0.35), transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: videoContainerFlex,
            height: '100%',
            maxHeight: '830px',
            zIndex: 1,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            transition: 'all .3s ease',
          }}
        >
          <HeaderStreamPage streamInfo={streamInfo} viewerCount={viewerCount} />
          {/* <VideoPlayer src={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} /> */}
          <VideoPlayer src={streamInfo?.hlsUrl} />
        </Box>
        <Box
          sx={{
            display: isMobile ? 'none' : 'block',
            flex: chatFlex,
            height: '100%',
            maxHeight: '636px',
            transition: 'all .3s ease',
          }}
        >
          {isOpen ? (
            <Chat isOpen={isOpen} setIsOpen={setIsOpen} messages={messages} sendMessage={sendMessage} />
          ) : (
            <Box>
              <Button onClick={() => setIsOpen(!isOpen)}>
                <FirstPageIcon
                  fontSize="large"
                  sx={{ color: 'var(--white)', minWidth: 'auto', transition: 'all .3s ease' }}
                />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

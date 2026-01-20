import { useState } from 'react';
// components
import { Chat } from '../../components/chat/Chat';
import { VideoPlayer } from '../../components/videoPlayer/VideoPlayer';
// mui
import { Box, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
// types
import { IChatMessage, IStream } from '../../types/share';
import { StyledContainerStream, StyledStreamContainerChat, StyledStreamContainerVideoPlayer } from './StyledStreamPage';
import { HeaderStreamPage } from './components/headerStreamPage/HeaderStreamPage';

export const StreamPage = ({
  streamInfo,
  viewerCount,
  messages,
  sendMessage,
}: {
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
      <StyledContainerStream sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
        <StyledStreamContainerVideoPlayer sx={{ flex: videoContainerFlex }}>
          <HeaderStreamPage streamInfo={streamInfo} viewerCount={viewerCount} />
          <VideoPlayer src={streamInfo?.hlsUrl} />
          {/* <VideoPlayer src={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} /> */}
        </StyledStreamContainerVideoPlayer>
        <StyledStreamContainerChat
          sx={{
            flex: chatFlex,
            minHeight: isMobile ? 'auto' : '100%',
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
        </StyledStreamContainerChat>
      </StyledContainerStream>
    </>
  );
};

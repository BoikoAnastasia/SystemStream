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
import { IStream } from '../../types/share';

export const StreamPage = ({
  videoRef,
  streamInfo,
  viewerCount,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  streamInfo: IStream;
  viewerCount: number;
}) => {
  const { isMobile } = useDeviceDetect();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
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
            flex: isOpen && !isMobile ? '0 1 70%' : '0 1 100%',
            height: '100%',
            padding: '0 10px',
            zIndex: 1,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            transition: 'all .3s ease',
          }}
        >
          <HeaderStreamPage streamInfo={streamInfo} viewerCount={viewerCount} />
          <video
            ref={videoRef}
            autoPlay
            playsInline
            controls
            style={{
              borderRadius: '20px',
              height: isMobile ? '250px' : '500px',
              maxHeight: isOpen ? '800px' : '100%',
            }}
          />
        </Box>
        <Box
          sx={{
            display: isMobile ? 'none' : 'block',
            flex: isOpen ? '0 1 30%' : '0 1 5%',
            height: '100%',
            transition: 'all .3s ease',
          }}
        >
          {isOpen ? (
            <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
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

import { FC, JSX, useState } from 'react';
// components
import { appLayout } from '../../layout';
import { Chat } from '../../components/chat/Chat';
import { HeaderStreamPage } from './components/headerStreamPage/HeaderStreamPage';
// mui
import { Box, Button, CardMedia } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

export const StreamPage: FC = appLayout((): JSX.Element => {
  const { isMobile } = useDeviceDetect();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          // height: '100%',
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
            flex: isOpen && !isMobile ? '0 1 70%' : '0 1 95%',
            height: '100%',
            padding: '0 20px',
            zIndex: 1,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            transition: 'all .3s ease',
          }}
        >
          <HeaderStreamPage />
          <CardMedia
            component="video"
            src="./video/video-04.mp4"
            controls
            sx={{
              borderRadius: '20px',
              height: 'auto',
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
});

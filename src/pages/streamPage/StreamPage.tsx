import { FC, JSX, useState } from 'react';
// components
import { appLayout } from '../../layout';
import { Chat } from '../../components/chat/Chat';
// mui
import { Box, Button, CardMedia } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import { HeaderStreamPage } from './components/headerStreamPage/HeaderStreamPage';

export const StreamPage: FC = appLayout((): JSX.Element => {
  const { isMobile } = useDeviceDetect();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: isOpen && !isMobile ? '0 1 70%' : '0 1 95%',
            height: '100%',
            transition: 'all .3s ease',
            padding: '0 20px',
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

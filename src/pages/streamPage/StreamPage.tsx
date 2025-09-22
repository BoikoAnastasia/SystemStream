import { FC, JSX, useState } from 'react';
// components
import { appLayout } from '../../layout';
import { UserHeader } from '../userPage/components/userHeader/UserHeader';
import { Chat } from '../../components/chat/Chat';
import { StyledStreamBoxAbout } from '../../components/StylesComponents';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
// mui
import { Box, Button, CardMedia } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

export const StreamPage: FC = appLayout((): JSX.Element => {
  const { isMobile } = useDeviceDetect();
  const testVideos = [
    { id: '1', video: './video/video-01.mp4', href: '/', name: 'Gaming Streamer', users: '1.2K viewers' },
    { id: '2', video: './video/video-02.mp4', href: '/', name: 'Tech Reviewer', users: '850 viewers' },
    { id: '3', video: './video/video-03.mp4', href: '/', name: 'Cooking Show Host', users: '600 viewers' },
    { id: '4', video: './video/video-01.mp4', href: '/', name: 'Indie Game Developer', users: '450 viewers' },
    { id: '5', video: './video/video-02.mp4', href: '/', name: 'Travel Vlogger', users: '300 viewers' },
    { id: '6', video: './video/video-03.mp4', href: '/', name: 'Fitness Instructor', users: '200 viewers' },
  ];
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
          }}
        >
          <CardMedia
            component="video"
            src="./video/video-01.mp4"
            controls
            sx={{
              height: isMobile ? '350px' : '500px',
            }}
          />
          <StyledStreamBoxAbout>
            <UserHeader />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '40px',
                background: 'var(--background-block)',
                borderRadius: '12px',
              }}
            >
              <h2>О стримере Ava Bennett</h2>
              <h4>Playing Valorant with friends</h4>
              <h5>Watch me play Valorant with my friends. We're trying to get to the next level, wish us luck!</h5>
            </Box>
            <Box>
              <SectionListVideo title={'Последние видео'} list={testVideos} isVideo={true} />
            </Box>
          </StyledStreamBoxAbout>
        </Box>
        <Box
          sx={{
            display: isMobile ? 'none' : 'block',
            flex: isOpen ? '0 1 30%' : '0 1 5%',
            height: '90%',
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

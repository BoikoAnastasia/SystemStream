import { StyledButtonDark, StyledSpanDark, StyledTitleH3 } from '../../../../components/StylesComponents';
import { CardVideo } from '../../../../components/cardVideo/CardVideo';
// mui
import { Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import TwitterIcon from '@mui/icons-material/Twitter';
// hooks
import { useDeviceDetect } from '../../../../hooks/useDeviceDetect';

export const UserAbout = () => {
  const { isMobile } = useDeviceDetect();
  const featureList = [
    { id: '1', img: '../img/users/user-01.jpg', href: '/', name: 'Gaming Streamer', users: '200 followers' },
    { id: '2', img: '../img/users/user-02.jpg', href: '/', name: 'Tech Reviewer', users: '850 followers' },
    { id: '3', img: '../img/users/user-03.jpg', href: '/', name: 'Cooking Show Host', users: '600 followers' },
  ];

  const propsStyleImg = {
    maxWidth: '160px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '12px',
    overflow: 'hidden',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <StyledTitleH3>Обо мне</StyledTitleH3>
        <StyledSpanDark>
          Hi, I'm Ava Bennett, a full-time streamer from Los Angeles. I love playing RPGs and interacting with my
          community. Join my streams for fun, games, and good vibes!
        </StyledSpanDark>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <StyledTitleH3>Соц. сети</StyledTitleH3>
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
          <StyledButtonDark h="58px" br="8px">
            <InstagramIcon />
            @AvaBennett
          </StyledButtonDark>
          <StyledButtonDark h="58px" br="8px">
            <XIcon />
            @AnaBennett
          </StyledButtonDark>
          <StyledButtonDark h="58px" br="8px">
            <TwitterIcon />
            @AnaBennett
          </StyledButtonDark>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <StyledTitleH3>Рекомендованные каналы</StyledTitleH3>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
          {featureList.map((item) => (
            <CardVideo item={item} styleProps={propsStyleImg} key={item.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

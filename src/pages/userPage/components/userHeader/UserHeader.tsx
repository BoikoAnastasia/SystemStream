import { Avatar, Box } from '@mui/material';
import {
  StyledButtonDark,
  StyledButtonLight,
  StyledSpanDark,
  StyledTitle,
  StyledUserHeaderBox,
} from '../../../../components/StylesComponents';
import { useDeviceDetect } from '../../../../hooks/useDeviceDetect';

export const UserHeader = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <StyledUserHeaderBox>
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Avatar
          src="../img/users/user-01.jpg"
          alt="Ava Bennett"
          style={{ width: '128px', height: '128px', objectPosition: 'center' }}
        />
        <Box>
          <StyledTitle>Ava Bennett</StyledTitle>
          <StyledSpanDark>Streamer | 1.2M followers</StyledSpanDark>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '12px', width: isMobile ? '100%' : 'auto', justifyContent: 'center' }}>
        <StyledButtonLight>Подписаться</StyledButtonLight>
        <StyledButtonDark>Поделиться</StyledButtonDark>
      </Box>
    </StyledUserHeaderBox>
  );
};

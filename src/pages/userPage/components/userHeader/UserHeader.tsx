import { Avatar, Box } from '@mui/material';
import { StyledButtonDark, StyledButtonLight, StyledUserHeaderBox } from '../../../../components/StylesComponents';
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
          <h2>Ava Bennett</h2>
          <h5 style={{ color: 'var(--background-line)' }}>Streamer | 1.2M followers</h5>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '12px', width: isMobile ? '100%' : 'auto', justifyContent: 'center' }}>
        <StyledButtonLight>Подписаться</StyledButtonLight>
        <StyledButtonDark>Поделиться</StyledButtonDark>
      </Box>
    </StyledUserHeaderBox>
  );
};

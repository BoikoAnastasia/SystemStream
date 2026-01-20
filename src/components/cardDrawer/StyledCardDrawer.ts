import { Box, styled } from '@mui/material';

export const CardDrawerBoxWatch = styled(Box)(() => ({
  position: 'absolute',
  bottom: 0,
  fontSize: '8px',
  width: '100%',
  padding: '2px',
  textAlign: 'center',
  borderRadius: '5px',
  color: 'var(--white)',
  backgroundColor: 'var(--live-btn)',
}));

export const CardDrawerContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
}));

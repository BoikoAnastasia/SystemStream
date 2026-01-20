import { Box, styled } from '@mui/material';
import { StyledAlertMessageProps } from '../../types/share';

export const StyledAlertText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'type',
})<StyledAlertMessageProps>(({ type }) => ({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 1.2,
  color: type,
}));

// modal
export const StyleModalContent = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  minWidth: '360px',
  backgroundColor: 'var(--background)',
  border: 'none',
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  fontSize: '28px',
  borderRadius: '12px',
}));

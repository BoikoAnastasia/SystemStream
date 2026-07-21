import { Box, styled } from '@mui/material';
import { StyledAlertMessageProps } from '../../types/share';

export const StyleModalContent = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(420px, calc(100vw - 32px))',
  background: 'linear-gradient(165deg, rgba(28, 24, 48, 0.98) 0%, rgba(18, 16, 32, 0.98) 100%)',
  border: '1px solid rgba(142, 123, 255, 0.28)',
  borderRadius: 14,
  padding: '20px 20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(109, 93, 251, 0.08)',
  outline: 'none',
}));

export const StyledAlertAccent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'type',
})<StyledAlertMessageProps>(({ type }) => {
  const color =
    type === 'error'
      ? 'rgba(235, 4, 0, 0.85)'
      : type === 'warning'
        ? 'rgba(255, 183, 77, 0.95)'
        : type === 'success'
          ? 'rgba(111, 255, 121, 0.85)'
          : 'rgba(142, 123, 255, 0.95)';

  return {
    height: 3,
    width: 48,
    borderRadius: 99,
    background: color,
    marginBottom: 2,
  };
});

export const StyledAlertTitle = styled('h2', {
  shouldForwardProp: (prop) => prop !== 'type',
})<StyledAlertMessageProps>(({ type }) => ({
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.3,
  color: type === 'error' ? '#ff8a80' : type === 'warning' ? '#ffb74d' : type === 'success' ? '#6fff79' : '#fff',
}));

export const StyledAlertText = styled('p')(() => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.78)',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}));

import { Box, Button, styled } from '@mui/material';

export const StyledContainerStream = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '500px',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, rgba(88,101,242,0.35), transparent 70%)',
    filter: 'blur(40px)',
    zIndex: 0,
  },
}));

export const StyledHeaderStreamPage = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '20px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '20px',
  },
}));

export const StyledStreamContainerVideoPlayer = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  // flex: videoContainerFlex,
  height: '100%',
  maxHeight: '830px',
  zIndex: 1,
  backgroundColor: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(16px)',
  transition: 'all .3s ease',
}));

export const StyledStreamContainerChat = styled(Box)(() => ({
  height: '100%',
  maxHeight: '636px',
  transition: 'all .3s ease',
}));

export const StyledButtonWathers = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '10px',
  height: 'min-content',
  minWidth: 'min-content',
  whiteSpace: 'nowrap',
  padding: '5px',
  color: 'var(--white)',
  background: 'var(--modal-background)',
}));

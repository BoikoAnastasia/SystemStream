import { Box, Button, Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledSubscribeButton = styled(Button)({
  marginTop: 16,
  width: '100%',
  textTransform: 'none',
  background: 'var(--gradient-selected)',
  color: 'var(--white)',
  borderRadius: 10,
  padding: '10px 14px',
  boxShadow: 'var(--boxShadowButton)',
  '&:hover': {
    background: 'var(--gradient-selected-hover)',
  },
});

export const StyledUsersGrid = styled(Grid)({
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    justifyContent: 'flex-start',
  },
});

export const StyledUserCard = styled(Box)({
  position: 'relative',
  borderRadius: 12,
  padding: '20px',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
  boxShadow: '0 8px 30px var(--background-scrollbar)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 220ms ease, box-shadow 220ms ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 18px 50px var(--background-header-menu)',
  },
});

export const StyledUserName = styled(Link)({
  marginTop: 12,
  fontWeight: 600,
  color: 'var(--white)',
  fontSize: 18,
  '@media (max-width: 768px)': {
    fontSize: 14,
  },
});

// avatar wrapper with soft glow
export const StyledAvatarWrap = styled(Box)({
  width: 96,
  height: 96,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

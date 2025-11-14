import { Box, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

export const StyleHeader = styled(Box)(() => ({
  minHeight: '65px',
  width: '100%',
  zIndex: '1000',
  backgroundColor: 'transparent',
}));

export const StyleHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
}));

export const StyleHeaderBlock = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  justifyContent: 'flex-end',
  width: '100%',
  '@media (max-width: 768px)': {
    gap: '5px',
  },
}));

export const StyledMenu = styled(Menu)(() => ({
  '& .MuiMenu-paper': {
    backgroundColor: 'var(--background-header-menu)',
    backdropFilter: 'blur(10px)',
  },
  '& .MuiList-root': {
    backgroundColor: 'var(--background-header-menu)',
    color: 'var(--color-link)',
    backdropFilter: 'blur(10px)',
  },
  '& .MuiMenuItem-root': {
    color: 'var(--color-link)',
    '&:hover': {
      backgroundColor: 'var(--background-tab)',
      color: 'var(--hover-header-menu)',
    },
  },
}));

export const StyledMenuButton = styled(MenuItem)(() => ({
  color: 'var(--white)',
  textTransform: 'none',
  fontSize: '1rem',
  width: '100%',
  padding: 0,
  justifyContent: 'flex-start',
  border: 'none',
  background: 'transparent',
}));

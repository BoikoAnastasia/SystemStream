import { Box, Button, Menu } from '@mui/material';
import { styled } from '@mui/system';

export const StyleHeader = styled(Box)(() => ({
  // position: 'sticky',
  // top: '0',
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
}));

export const StyledMenu = styled(Menu)(() => ({
  '& .MuiMenu-paper': {
    backgroundColor: '#121026c9',
    backdropFilter: 'blur(10px)',
  },
  '& .MuiList-root': {
    backgroundColor: '#121026c9',
    color: '#A1A1B5',
    backdropFilter: 'blur(10px)',
  },
  '& .MuiMenuItem-root': {
    color: '#A1A1B5',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#dadadaff',
    },
  },
}));

export const StyledMenuButton = styled(Button)(() => ({
  color: 'white',
  textTransform: 'none',
  fontSize: '1rem',
  width: '100%',
  padding: 0,
  justifyContent: 'flex-start',
  border: 'none',
  background: 'transparent',
}));

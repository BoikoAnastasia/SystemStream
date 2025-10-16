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
    backgroundColor: '#232323',
  },
  '& .MuiList-root': {
    backgroundColor: '#232323',
    color: '##fff',
  },
  '& .MuiMenuItem-root': {
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(37, 37, 37, 1)323',
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

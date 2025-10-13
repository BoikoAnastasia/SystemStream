import { Box, Menu } from '@mui/material';
import { styled } from '@mui/system';

export const StyleHeader = styled(Box)(() => ({
  position: 'sticky',
  backgroundColor: 'var(--background)',
  borderBottom: '1px solid #E5E8EB',
  minHeight: '65px',
}));

export const StyleHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
}));

export const StyleHeaderBlock = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
}));

export const StyledMenu = styled(Menu)(() => ({
  '& .MuiMenu-paper': {
    backgroundColor: '#232323', // фон самого меню
  },
  '& .MuiList-root': {
    backgroundColor: '#232323', // фон списка
    color: '##fff', // серый текст по умолчанию
  },
  '& .MuiMenuItem-root': {
    color: '#fff', // серый текст
    '&:hover': {
      backgroundColor: 'rgba(37, 37, 37, 1)323', // фон при наведении
      color: '#dadadaff', // текст при наведении
    },
  },
}));

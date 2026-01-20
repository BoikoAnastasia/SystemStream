import { Box, Drawer, styled, Typography } from '@mui/material';

export const DrawerContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

export const DrawerContainerHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '20px',
  marginBottom: '45px',
}));

export const DrawerTypography = styled(Typography)(() => ({
  fontSize: '16px',
  color: 'var(--color-link)',
}));

export const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: '250px',
    height: '100%',
    minWidth: '250px',
    padding: '25px 16px 0',
    background: 'var(--gradient-sidebar-open)',
    paddingBottom: '200px',
  },
  '@media (max-width: 768px)': {
    '& .MuiDrawer-paper': {
      width: '40%',
    },
  },
  '& ::-webkit-scrollbar': {
    width: '5px',
    background: 'var(--button-dark-hover)',
    borderRadius: '5px',
  },
  scrollbarWidth: 'thin',
}));

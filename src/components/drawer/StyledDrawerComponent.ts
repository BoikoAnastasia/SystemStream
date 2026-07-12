import { Box, Drawer, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const DrawerContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 4,
  paddingBottom: 32,
}));

export const DrawerContainerHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
  paddingLeft: 4,
}));

export const DrawerSectionTitle = styled(Typography)(() => ({
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginTop: 16,
  marginBottom: 8,
  paddingLeft: 8,
}));

export const DrawerEmptyText = styled(Typography)(() => ({
  fontSize: 13,
  color: 'rgba(255,255,255,0.45)',
  lineHeight: 1.45,
  padding: '4px 8px 8px',
}));

export const DrawerNavLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 12px',
  borderRadius: 10,
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.85)',
  border: '1px solid transparent',
  transition: 'background 0.15s ease, border-color 0.15s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
  },
}));

export const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: 280,
    minWidth: 280,
    padding: '20px 14px',
    background: 'rgba(12,10,28,0.96)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255,255,255,0.08)',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(142,123,255,0.35) transparent',
  },
  '& .MuiDrawer-paper::-webkit-scrollbar': {
    width: 6,
  },
  '& .MuiDrawer-paper::-webkit-scrollbar-thumb': {
    background: 'rgba(142,123,255,0.35)',
    borderRadius: 999,
  },
  '@media (max-width: 768px)': {
    '& .MuiDrawer-paper': {
      width: 'min(88vw, 320px)',
      minWidth: 'min(88vw, 320px)',
    },
  },
}));

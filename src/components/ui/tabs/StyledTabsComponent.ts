import { styled, Tab, Tabs } from '@mui/material';

// Tabs
export const StyledTabs = styled(Tabs)(() => ({
  display: 'inline-flex',
  justifyContent: 'center',
  width: '100%',
  margin: '0 auto',
  padding: '4px',
  borderBottom: 'none',
  borderRadius: '12px',
  background: 'var(--background-tabs)',
  scrollbarWidth: 'thin',
  '& .MuiTabs-list': {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  '& ::-webkit-scrollbar': {
    height: '5px',
    background: 'var(--background-scrollb)',
    borderRadius: '5px',
  },
  '&.MuiTabs-root': {
    width: 'auto',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },

  '& .MuiTabs-flexContainer': {
    gap: '10px',
  },
  '@media (max-width: 768px)': {
    width: '100% !important',
    overflowX: 'auto',
    '& .MuiTabs-scroller': {
      overflowX: 'auto !important',
      '&::-webkit-scrollbar': { display: 'none' },
    },
  },
}));

export const StyledTab = styled(Tab)(() => ({
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  color: 'var(--color-link)',
  minHeight: 36,
  minWidth: 90,
  borderRadius: '10px',
  transition: 'all 0.25s ease',
  background: 'transparent',
  '&:hover': {
    background: 'var(--background-tab)',
    color: 'var(--white)',
  },

  '&.Mui-selected': {
    color: 'var(--white)',
    background: 'var(--gradient-selected)',
    boxShadow: 'var(--boxShadowButton)',
  },
}));

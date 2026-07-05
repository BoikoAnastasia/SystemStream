import { Box, List, ListItem, styled, Typography } from '@mui/material';

export const StyledDashboardContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  minHeight: 'calc(100vh - 72px)',
  padding: '24px 0 40px',
});

export const StyledDashboardSidebar = styled(Box)({
  width: '100%',
  maxWidth: 320,
  flexShrink: 0,
  paddingRight: 24,
});

export const StyledDashboardContent = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const StyledDashboardHero = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  marginBottom: 24,
  padding: '20px 24px',
  borderRadius: 16,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(16px)',
});

export const StyledDashboardPanel = styled(Box)({
  padding: '24px',
  borderRadius: 16,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(16px)',
});

export const StyledDashboardNavList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 0,
});

export const StyledDashboardNavItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 4,
  padding: '14px 16px',
  borderRadius: 12,
  cursor: 'pointer',
  border: `1px solid ${active ? 'rgba(142,123,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
  background: active ? 'rgba(142,123,255,0.12)' : 'rgba(255,255,255,0.03)',
  transition: 'background 0.15s ease, border-color 0.15s ease',
  '&:hover': {
    background: active ? 'rgba(142,123,255,0.16)' : 'rgba(255,255,255,0.06)',
  },
}));

export const StyledDashboardNavTitle = styled(Typography)({
  fontSize: 15,
  fontWeight: 700,
  color: '#fff',
  lineHeight: 1.3,
});

export const StyledDashboardNavDescription = styled(Typography)({
  fontSize: 12,
  color: 'rgba(255,255,255,0.45)',
  lineHeight: 1.35,
});

export const StyledDashboardSectionTitle = styled(Typography)({
  fontSize: 22,
  fontWeight: 700,
  color: '#fff',
  marginBottom: 8,
});

export const StyledDashboardSectionHint = styled(Typography)({
  fontSize: 14,
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 24,
  lineHeight: 1.45,
});

export const StyledDashboardPlaceholder = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: '20px',
  borderRadius: 12,
  border: '1px dashed rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.02)',
});

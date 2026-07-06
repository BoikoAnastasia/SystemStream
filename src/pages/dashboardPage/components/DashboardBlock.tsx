import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const DashboardBlock = ({
  icon,
  title,
  hint,
  children,
  sx,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
  children: ReactNode;
  sx?: Record<string, unknown>;
}) => (
  <Box
    sx={{
      height: '100%',
      minHeight: 0,
      p: 1.75,
      borderRadius: 2,
      bgcolor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: 1.25,
      ...sx,
    }}
  >
    <Box sx={{ flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: hint ? 0.5 : 0 }}>
        {icon}
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{title}</Typography>
      </Box>
      {hint && <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.42)', lineHeight: 1.4 }}>{hint}</Typography>}
    </Box>
    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</Box>
  </Box>
);

export const dashboardChatGridSx = {
  display: 'grid',
  width: '100%',
  gap: 1.5,
  alignItems: 'stretch',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    lg: 'repeat(3, minmax(0, 1fr))',
  },
};

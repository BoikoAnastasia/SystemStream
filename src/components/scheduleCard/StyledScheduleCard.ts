import { Box, Button, Card, FormControl, InputLabel, Select, styled, Typography } from '@mui/material';

export const StyledButtonReminder = styled(Button)({
  display: 'inline-flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '1.125rem',
  color: 'var(--white)',
  borderRadius: '5px',
  padding: '5px 15px',
  background: 'rgba(255, 255, 255, 0.03)',
  textTransform: 'none',
});

export const StyledScheduleCardText = styled(Typography)({
  fontSize: '1rem',
  color: '#cccfd8ff',
});

export const StyledScheduleCard = styled(Card)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '20px',
  borderRadius: '12px',
  overflow: 'hidden',
  background: 'var(--background-tabs)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'var(--background-card)',
  },
});

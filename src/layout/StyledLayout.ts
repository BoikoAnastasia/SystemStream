import { Box } from '@mui/material';
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

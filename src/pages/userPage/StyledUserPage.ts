import { Box, styled } from '@mui/material';

export const StyledVideoGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '20px',
  padding: '0 20px',
});

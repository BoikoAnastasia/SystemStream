import { Box } from '@mui/material';
import { Styledloading } from '../../StylesComponents';

export const Loader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
      <Styledloading>Load&nbsp;ng</Styledloading>
    </Box>
  );
};

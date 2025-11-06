import { JSX } from 'react';
import { Header } from './Header';
import { Box } from '@mui/material';

export const settingLayout = (PageComponent: () => JSX.Element, header = true, footer = true) => {
  return function WithPage({ ...props }) {
    return (
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', flex: 1, background: 'transparent', flexDirection: 'column', width: '100%' }}>
          {header && <Header />}
          <PageComponent {...props} />
        </Box>
      </Box>
    );
  };
};

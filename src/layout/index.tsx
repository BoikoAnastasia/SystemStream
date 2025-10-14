import { JSX } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Box } from '@mui/material';
import { DrawerComponent } from '../components/drawer/DrawerComponent';

export const appLayout = (PageComponent: () => JSX.Element, header = true, footer = true) => {
  return function WithPage({ ...props }) {
    return (
      <>
        <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
          <Sidebar />
          <DrawerComponent />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {header && <Header />}
            <PageComponent {...props} />
          </Box>
        </Box>
        {footer && <Footer />}
      </>
    );
  };
};

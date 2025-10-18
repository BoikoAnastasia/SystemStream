import { Logo } from '../components/logo/Logo';
// components
import { SearchInput } from '../components/ui/searchInput/SearchInput';
import { HeaderNotificationMenu } from '../components/ui/headerNotificationMenu/HeaderNotificationMenu';
// hooks
import { useDeviceDetect } from '../hooks/useDeviceDetect';
// style
import { StyleHeader, StyleHeaderBlock, StyleHeaderContainer } from './StyledLayout';
import { HeaderMenuAvatar } from '../components/ui/headerMenuAvatar/HeaderMenuAvatar';
import { useDrawer } from '../context/DrawerContext';
// mui
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  const { isMobile } = useDeviceDetect();
  const { open, setOpen } = useDrawer();

  return (
    <StyleHeader>
      <StyleHeaderContainer className="container">
        <Button onClick={() => setOpen(!open)} sx={{ display: isMobile ? 'flex' : 'none' }}>
          <MenuIcon sx={{ color: 'var(--white)' }}></MenuIcon>
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-beetwen', width: '100%' }}>
          {isMobile ? <></> : <Logo />}

          <StyleHeaderBlock>
            <SearchInput width={'200px'} />
            <HeaderNotificationMenu />
            <HeaderMenuAvatar />
          </StyleHeaderBlock>
        </Box>
      </StyleHeaderContainer>
    </StyleHeader>
  );
};

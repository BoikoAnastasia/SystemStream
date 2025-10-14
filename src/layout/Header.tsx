// components
import { SearchInput } from '../components/ui/searchInput/SearchInput';
// hooks
import { useDeviceDetect } from '../hooks/useDeviceDetect';
// style
import { StyleHeader, StyleHeaderBlock, StyleHeaderContainer } from './StyledLayout';
import { HeaderMenuAvatar } from '../components/ui/headerMenuAvatar/HeaderMenuAvatar';
import { useDrawer } from '../context/DrawerContext';
// mui
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  const { isMobile } = useDeviceDetect();
  const { open, setOpen } = useDrawer();

  return (
    <StyleHeader>
      <StyleHeaderContainer className="container">
        <Button onClick={() => setOpen(!open)} sx={{ display: isMobile ? 'flex' : 'none' }}>
          <MenuIcon sx={{ color: 'white' }}></MenuIcon>
        </Button>
        <StyleHeaderBlock>
          <SearchInput width={'200px'} />
          <HeaderMenuAvatar />
        </StyleHeaderBlock>
      </StyleHeaderContainer>
    </StyleHeader>
  );
};

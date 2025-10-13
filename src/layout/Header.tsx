import { useState } from 'react';

// components
import { Logo } from '../components/logo/Logo';
import { SearchInput } from '../components/ui/searchInput/SearchInput';
import { ModalComponent } from '../components/modal/ModalComponent';
import { HeaderMenu } from '../components/headerMenu/HeaderMenu';
import { ButtonLogIn } from '../components/ui/button/ButtonLogIn';

// hooks
import { useDeviceDetect } from '../hooks/useDeviceDetect';

// mui
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// style
import { StyleHeader, StyleHeaderBlock, StyleHeaderContainer } from './StyledLayout';
import { HeaderMenuAvatar } from '../components/ui/headerMenuAvatar/HeaderMenuAvatar';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { isMobile } = useDeviceDetect();

  return (
    <StyleHeader>
      <StyleHeaderContainer className="container">
        <StyleHeaderBlock>
          <Logo />
          {isMobile ? (
            <IconButton>
              <MenuIcon sx={{ color: 'white' }} fontSize="large" />
            </IconButton>
          ) : (
            <HeaderMenu />
          )}
        </StyleHeaderBlock>
        <StyleHeaderBlock>
          {isMobile ? <></> : <SearchInput width={'160px'} />}
          <ButtonLogIn onClick={handleOpen} />
          <HeaderMenuAvatar />
        </StyleHeaderBlock>
      </StyleHeaderContainer>
      <ModalComponent title="Войти или зарегистрироваться" open={open} setOpen={setOpen} />
    </StyleHeader>
  );
};

import { useState } from 'react';

import { Logo } from '../components/logo/Logo';
import { SearchInput } from '../components/ui/searchInput/SearchInput';
import { ModalComponent } from '../components/modal/ModalComponent';
import { HeaderMenu } from '../components/headerMenu/HeaderMenu';
import { ButtonLogIn } from '../components/ui/button/ButtonLogIn';
import Avatar from '@mui/material/Avatar';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__block">
          <Logo />
          <HeaderMenu />
        </div>
        <div className="header__block">
          <SearchInput />
          <ButtonLogIn onClick={handleOpen} />
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
      </div>
      <ModalComponent title="Войти или зарегистироваться" open={open} setOpen={setOpen} />
    </header>
  );
};

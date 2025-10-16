import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// redux
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/reducers/ActionCreate';
// components
import { StyledMenu, StyledMenuButton } from '../../../layout/StyledLayout';
import { ModalComponent } from '../../modal/ModalComponent';
// utils
import { checkCookie } from '../../../utils/cookieFunctions';
// mui
import { Avatar, Button, MenuItem } from '@mui/material';

export const HeaderMenuAvatar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLogged, setIsLogged] = useState(checkCookie('tokenData'));

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await dispatch(logoutUser());
    setIsLogged(false);
    handleClose();
  };

  useEffect(() => {
    console.log(isLogged);
    const interval = setInterval(() => {
      const cookieExists = checkCookie('tokenData');
      setIsLogged(cookieExists);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLogged]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt="Remy Sharp" src="./img/users/user-01.jpg" />
      </Button>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem>
          <Link to="#">Личный кабинет</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/user">Профиль</Link>
        </MenuItem>
        <MenuItem>
          <Link to="#">Настройки</Link>
        </MenuItem>
        {isLogged ? (
          <MenuItem>
            <StyledMenuButton onClick={logout}>Выйти</StyledMenuButton>
          </MenuItem>
        ) : (
          <MenuItem>
            <StyledMenuButton onClick={handleOpenModal}>Войти</StyledMenuButton>
          </MenuItem>
        )}
      </StyledMenu>
      <ModalComponent title="Войти или зарегистрироваться" open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

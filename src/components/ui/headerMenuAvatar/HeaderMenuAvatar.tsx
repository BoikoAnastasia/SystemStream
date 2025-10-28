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
import { IconButton, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useAppSelector } from '../../../hooks/redux';

export const HeaderMenuAvatar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: profile } = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLogged, setIsLogged] = useState(checkCookie('tokenData'));
  const menuData = [
    {
      href: '/',
      value: 'Личный кабинет',
    },
    {
      href: `/${profile?.nickname}`,
      value: 'Профиль',
    },
    {
      href: '/settings',
      value: 'Настройки',
    },
  ];

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
    const interval = setInterval(() => {
      const cookieExists = checkCookie('tokenData');
      setIsLogged(cookieExists);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLogged]);

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <PersonIcon sx={{ color: 'var(--white)' }} fontSize="medium" />
      </IconButton>
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
        {menuData.map((item, index) => (
          <MenuItem key={index}>
            <Link to={item.href}>{item.value}</Link>
          </MenuItem>
        ))}
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
    </>
  );
};

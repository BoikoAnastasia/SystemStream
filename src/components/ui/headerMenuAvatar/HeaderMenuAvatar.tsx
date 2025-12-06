import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// redux
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/actions/UserActions';
import { useAppSelector } from '../../../hooks/redux';
// components
import { StyledMenu } from '../../../layout/StyledLayout';
import { ModalComponent } from '../../modal/ModalComponent';
// mui
import { IconButton, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SavingsIcon from '@mui/icons-material/Savings';
import SettingsIcon from '@mui/icons-material/Settings';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const HeaderMenuAvatar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: profile, isAuth } = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const menuData = [
    // {
    //   authOnly: true,
    //   href: '/',
    //   value: 'Личный кабинет',
    // },
    {
      authOnly: true,
      href: `/${profile?.nickname}`,
      icon: PermIdentityIcon,
      value: 'Профиль',
    },
    {
      authOnly: true,
      href: '/settings',
      icon: SettingsIcon,
      value: 'Настройки',
    },
    {
      authOnly: true,
      href: '/settings',
      icon: SavingsIcon,
      value: 'Баланс: 0 руб',
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
    handleClose();
  };

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
        {menuData
          .filter((item) => (item.authOnly ? isAuth : true))
          .map((item, index) => (
            <MenuItem
              sx={{ '&.MuiMenuItem-root': { color: 'var(--white)', display: 'flex', gap: '4px' } }}
              key={index}
              component={Link}
              to={item.href}
            >
              {item.icon && <item.icon />}
              {item.value}
            </MenuItem>
          ))}
        {isAuth ? (
          <MenuItem
            sx={{ '&.MuiMenuItem-root': { color: 'var(--white)', display: 'flex', gap: '4px' } }}
            onClick={logout}
          >
            <LogoutIcon />
            Выйти
          </MenuItem>
        ) : (
          <MenuItem
            sx={{ '&.MuiMenuItem-root': { color: 'var(--white)', display: 'flex', gap: '4px' } }}
            onClick={handleOpenModal}
          >
            <LoginIcon />
            Войти
          </MenuItem>
        )}
      </StyledMenu>
      <ModalComponent open={openModal} setOpen={setOpenModal} title="Войти или зарегистрироваться" />
    </>
  );
};

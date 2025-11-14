import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// redux
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/actions/UserActions';
import { useAppSelector } from '../../../hooks/redux';
// context
import { useHeaderModal } from '../../../context/HeaderModalContext';
// components
import { StyledMenu } from '../../../layout/StyledLayout';
import { ModalComponent } from '../../modal/ModalComponent';
// mui
import { IconButton, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export const HeaderMenuAvatar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: profile, isAuth } = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setOpen: setOpenModal } = useHeaderModal();
  const menuData = [
    // {
    //   authOnly: true,
    //   href: '/',
    //   value: 'Личный кабинет',
    // },
    {
      authOnly: true,
      href: `/${profile?.nickname}`,
      value: 'Профиль',
    },
    {
      authOnly: true,
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
              sx={{ '&.MuiMenuItem-root': { color: 'var(--white)' } }}
              key={index}
              component={Link}
              to={item.href}
            >
              {item.value}
            </MenuItem>
          ))}
        {isAuth ? (
          <MenuItem sx={{ '&.MuiMenuItem-root': { color: 'var(--white)' } }} onClick={logout}>
            Выйти
          </MenuItem>
        ) : (
          <MenuItem sx={{ '&.MuiMenuItem-root': { color: 'var(--white)' } }} onClick={handleOpenModal}>
            Войти
          </MenuItem>
        )}
      </StyledMenu>
      <ModalComponent title="Войти или зарегистрироваться" />
    </>
  );
};

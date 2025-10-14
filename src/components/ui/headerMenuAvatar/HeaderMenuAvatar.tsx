import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// components
import { StyledMenu } from '../../../layout/StyledLayout';
import { ModalComponent } from '../../modal/ModalComponent';
// mui
import { Avatar, Button, MenuItem } from '@mui/material';

export const HeaderMenuAvatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);

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
        <MenuItem>
          <Button
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              width: '100%',
              padding: 0,
              justifyContent: 'flex-start',
              border: 'none',
              background: 'transparent',
            }}
            onClick={handleOpenModal}
          >
            Войти
          </Button>
        </MenuItem>
        <MenuItem>
          <Link to="#">Выйти</Link>
        </MenuItem>
      </StyledMenu>
      <ModalComponent title="Войти или зарегистрироваться" open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

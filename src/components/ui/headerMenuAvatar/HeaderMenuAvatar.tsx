import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledMenu } from '../../../layout/StyledLayout';

export const HeaderMenuAvatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Link to="#">Выход</Link>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

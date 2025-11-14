import { useState } from 'react';
import { Link } from 'react-router-dom';
// context
import { useNotification } from '../../../context/NotificationContext';
// mui
import { IconButton, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// styles, types
import { IconNotidicationCount, StyledMenu } from '../../../layout/StyledLayout';
import { INotification } from '../../../types/share';

export const HeaderNotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { notifications, removeNotification } = useNotification();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ position: 'relative' }}
      >
        <NotificationsIcon sx={{ color: 'var(--white)' }} fontSize="medium" />

        {notifications.length !== 0 && <IconNotidicationCount />}
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
        {notifications.length !== 0 ? (
          notifications.map((notification: INotification) => (
            <MenuItem component={Link} to={notification.link} onClick={() => removeNotification(notification.id)}>
              {notification.message}
            </MenuItem>
          ))
        ) : (
          <MenuItem>Уведомлений нет</MenuItem>
        )}
      </StyledMenu>
    </>
  );
};

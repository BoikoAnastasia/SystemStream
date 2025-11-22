import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// context
import { useNotification } from '../../../context/NotificationContext';
// mui
import { Box, IconButton, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// styles, types
import { IconNotidicationCount, StyledMenu } from '../../../layout/StyledLayout';
import { INotification } from '../../../types/share';

export const HeaderNotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { notifications, removeNotification } = useNotification();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (link: string, id: string) => {
    removeNotification(id);
    navigate(link.startsWith('/') ? link : `/${link}`);
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
            <MenuItem
              sx={{ display: 'grid', gridTemplateAreas: `'icon title time' 'icon message message'`, gap: '5px 10px' }}
              key={notification.id}
              onClick={() => handleNotificationClick(notification.link, notification.id)}
            >
              <notification.icon sx={{ gridArea: 'icon' }} />
              <Box sx={{ gridArea: 'title' }}>{notification.title}</Box>
              <Box sx={{ gridArea: 'message' }}>{notification.message}</Box>
              <Box sx={{ gridArea: 'time', fontSize: '10px', gridColumn: 'span 1' }}>{notification.id}</Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem>Уведомлений нет</MenuItem>
        )}
      </StyledMenu>
    </>
  );
};

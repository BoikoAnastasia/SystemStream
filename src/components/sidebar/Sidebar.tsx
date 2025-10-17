import { useState } from 'react';
// components
import { Logo } from '../logo/Logo';
// mui
import { Box, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// styles
import {
  StyledSidebar,
  StyledSidebarLink,
  StyledSidebarList,
  StyledSidebarListItem,
  StyledSidebarName,
} from '../StylesComponents';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

export const Sidebar = () => {
  const { isMobile } = useDeviceDetect();
  const [open, setOpen] = useState(true);

  return (
    <StyledSidebar style={{ width: open ? '250px' : 'auto', padding: open ? '25px 16px 0' : '25px 5px 0' }}>
      {open ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', transition: 'all .3s ease' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: '20px',
              marginBottom: '45px',
            }}
          >
            <Logo />
            <Button onClick={() => setOpen(!open)}>
              <FirstPageIcon
                fontSize="large"
                sx={{
                  color: 'var(--white)',
                  minWidth: 'auto',
                  transform: open ? 'rotate(0deg)' : 'rotate(-180deg)',
                  transition: 'all .3s ease',
                }}
              />
            </Button>
          </Box>
          <StyledSidebarName>Для вас</StyledSidebarName>
          <StyledSidebarList>
            <StyledSidebarListItem>
              <StyledSidebarLink to="#">Home</StyledSidebarLink>
            </StyledSidebarListItem>
            <StyledSidebarListItem>
              <StyledSidebarLink to="#">Browse</StyledSidebarLink>
            </StyledSidebarListItem>
            <StyledSidebarListItem>
              <StyledSidebarLink to="#">Esports</StyledSidebarLink>
            </StyledSidebarListItem>
          </StyledSidebarList>
          <StyledSidebarName>Сейчас в эфире</StyledSidebarName>
        </Box>
      ) : (
        <Box sx={{ display: isMobile ? 'none' : 'block' }}>
          <Button onClick={() => setOpen(!open)}>
            <FirstPageIcon
              fontSize="large"
              sx={{ color: 'var(--white)', minWidth: 'auto', transform: open ? 'rotate(0deg)' : 'rotate(-180deg)' }}
            />
          </Button>
        </Box>
      )}
    </StyledSidebar>
  );
};

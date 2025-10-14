// components
import { Logo } from '../logo/Logo';
import { useDrawer } from '../../context/DrawerContext';

// mui
import { Box } from '@mui/material';
// styles
import {
  StyledDrawer,
  StyledSidebarLink,
  StyledSidebarList,
  StyledSidebarListItem,
  StyledSidebarName,
} from '../StylesComponents';

export const DrawerComponent = () => {
  const { open, setOpen } = useDrawer();

  return (
    <StyledDrawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
    </StyledDrawer>
  );
};

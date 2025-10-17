// mui
import { Box, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// styles
import { StyledSidebar } from '../StylesComponents';
// hooks
import { useDrawer } from '../../context/DrawerContext';

export const Sidebar = () => {
  const { setOpen } = useDrawer();

  return (
    <StyledSidebar style={{ width: 'auto', padding: '25px 5px 0' }}>
      <Box>
        <Button onClick={() => setOpen(true)}>
          <FirstPageIcon
            fontSize="large"
            sx={{ color: 'var(--white)', minWidth: 'auto', transform: 'rotate(-180deg)' }}
          />
        </Button>
      </Box>
    </StyledSidebar>
  );
};

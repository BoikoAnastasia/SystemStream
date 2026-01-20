// store
import { selectStreams } from '../../store/actions/StreamsActions';
// components
import { CardDrawer } from '../cardDrawer/CardDrawer';
// mui
import { Box, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
// hooks
import { useDrawer } from '../../context/DrawerContext';
import { useAppSelector } from '../../hooks/redux';
// types
import { IStreamOnline } from '../../types/share';
// styles
import { StyledSidebar, StyledSidebarList, StyledSidebarListItem } from '../StylesComponents';

export const Sidebar = () => {
  const { setOpen } = useDrawer();
  const streams = useAppSelector(selectStreams);

  return (
    <StyledSidebar style={{ width: 'auto', padding: '9px 5px 0' }}>
      <Box style={{ margin: '0 auto' }}>
        <Button onClick={() => setOpen(true)}>
          <FirstPageIcon
            fontSize="large"
            sx={{ color: 'var(--white)', minWidth: 'auto', transform: 'rotate(-180deg)' }}
          />
        </Button>
      </Box>
      <StyledSidebarList sx={{ height: '100%', overflowX: 'hidden', flex: 1 }}>
        {(streams ?? []).map((stream: IStreamOnline) => (
          <StyledSidebarListItem key={stream.streamId}>
            <CardDrawer variant={'compact'} card={stream} />
          </StyledSidebarListItem>
        ))}
      </StyledSidebarList>
    </StyledSidebar>
  );
};

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
  // const { data } = useAppSelector((state) => state.user);
  // const [subscribers, setSubscribers] = useState<ISubscriber[] | null>(null);

  // useEffect(() => {
  //   if (!data) return;
  //   const fetchSubsribers = async () => {
  //     const users = await fetchtSubsribtionsMy();
  //     setSubscribers(users);
  //   };
  //   fetchSubsribers();
  // }, [data]);

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

      {/* {subscribers && (
        <StyledSidebarList sx={{ height: '100%', overflowX: 'hidden', flex: 1 }}>
          {subscribers.map((card) => (
            <StyledSidebarListItem key={card.nickname}>
              <CardDrawer card={card} variant="compact" />
            </StyledSidebarListItem>
          ))}
        </StyledSidebarList>
      )} */}
    </StyledSidebar>
  );
};

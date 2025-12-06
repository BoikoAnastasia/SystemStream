import { useEffect, useState } from 'react';
// store
import { selectStreams } from '../../store/actions/StreamsActions';
import { fetchtSubsribtionsMy } from '../../store/actions/SubscribersActions';
// components
import { Logo } from '../logo/Logo';
import { useDrawer } from '../../context/DrawerContext';
import { CardDrawer } from '../cardDrawer/CardDrawer';
// hooks
import { useAppSelector } from '../../hooks/redux';
// mui
import { Box, SvgIconTypeMap, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { OverridableComponent } from '@mui/material/OverridableComponent';
// styles
import {
  CardDrawerTypography,
  StyledChatTextField,
  StyledDrawer,
  StyledNameComponents,
  StyledSidebarLink,
  StyledSidebarList,
  StyledSidebarListItem,
  StyledSidebarName,
  StyledSpanDark,
} from '../StylesComponents';
// types
import { IStreamOnline, ISubscriber } from '../../types/share';

interface IButtonInfo {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  value: string;
  href: string;
}

export const DrawerComponent = () => {
  const { open, setOpen } = useDrawer();
  const buttonInfo: IButtonInfo[] = [
    {
      icon: HomeIcon,
      value: 'Главная',
      href: '/',
    },
    {
      icon: HistoryIcon,
      value: 'История',
      href: '#',
    },
    {
      icon: SportsEsportsIcon,
      value: 'Категории',
      href: '#',
    },
  ];
  // const dispatch = useDispatch<AppDispatch>();
  const { data } = useAppSelector((state) => state.user);
  const streams = useAppSelector(selectStreams);
  const [subscribers, setSubscribers] = useState<ISubscriber[] | null>(null);
  console.log(subscribers);
  useEffect(() => {
    if (!data) return;
    const fetchSubsribers = async () => {
      const users = await fetchtSubsribtionsMy();
      setSubscribers(users);
    };
    fetchSubsribers();
  }, [data]);

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
          {buttonInfo.map((btn: IButtonInfo, i) => (
            <StyledSidebarListItem key={i}>
              <StyledSidebarLink to={btn.href}>
                <btn.icon /> {btn.value}
              </StyledSidebarLink>
            </StyledSidebarListItem>
          ))}
        </StyledSidebarList>
        <StyledSidebarName>Ваши подписки:</StyledSidebarName>
        {subscribers === null ? (
          <Typography sx={{ fontSize: '16px', color: 'var(--color-link)' }}>Загрузка...</Typography>
        ) : subscribers.length === 0 ? (
          <Typography sx={{ fontSize: '16px', color: 'var(--color-link)' }}>У вас нет подписок</Typography>
        ) : (
          <StyledSidebarList sx={{ height: '100%', overflowX: 'hidden', flex: 1 }}>
            {subscribers.map((card) => (
              <StyledSidebarListItem sx={{ padding: '0 !important' }} key={card.nickname}>
                <CardDrawer card={card} />
              </StyledSidebarListItem>
            ))}
          </StyledSidebarList>
        )}
        <StyledSidebarName>Сейчас в эфире:</StyledSidebarName>
        {streams === null ? (
          <Typography sx={{ fontSize: '16px', color: 'var(--color-link)' }}>Загрузка...</Typography>
        ) : streams.length === 0 ? (
          <Typography sx={{ fontSize: '16px', color: 'var(--color-link)' }}>Сейчас нет стримов</Typography>
        ) : (
          (streams ?? []).map((stream: IStreamOnline) => (
            <StyledSidebarListItem key={stream.streamId}>
              <CardDrawer card={stream} />
            </StyledSidebarListItem>
          ))
        )}
      </Box>
    </StyledDrawer>
  );
};

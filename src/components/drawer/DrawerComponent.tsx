import { useEffect } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Logo } from '../logo/Logo';
import { useDrawer } from '../../context/DrawerContext';
import { useSidebarPanel } from '../../context/SidebarPanelContext';
import { buildSidebarLists } from '../sidebar/sidebar.utils';
import { CardDrawer } from '../cardDrawer/CardDrawer';
import {
  DrawerContainer,
  DrawerContainerHeader,
  DrawerEmptyText,
  DrawerNavLink,
  DrawerSectionTitle,
  StyledDrawer,
} from './StyledDrawerComponent';

export const DrawerComponent = () => {
  const { open, setOpen } = useDrawer();
  const { streams, streamsLoading, streamsError, subscribers, subsLoading, subsError, isAuth, refreshPanelData } =
    useSidebarPanel();

  useEffect(() => {
    if (open) {
      refreshPanelData();
    }
  }, [open, refreshPanelData]);

  const { subscriptionsWithLive, liveOutsideSubscriptions } = buildSidebarLists(subscribers, streams);
  const liveAmongSubs = subscriptionsWithLive.some((s) => s.isOnline);

  return (
    <StyledDrawer open={open} onClose={() => setOpen(false)}>
      <DrawerContainer>
        <DrawerContainerHeader>
          <Logo />
          <IconButton
            onClick={() => setOpen(false)}
            aria-label="Свернуть меню"
            sx={{
              color: 'rgba(255,255,255,0.55)',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerContainerHeader>

        <DrawerSectionTitle>Навигация</DrawerSectionTitle>
        <DrawerNavLink to="/" onClick={() => setOpen(false)}>
          <HomeOutlinedIcon sx={{ fontSize: 20 }} />
          Главная
        </DrawerNavLink>

        {isAuth && (
          <>
            <DrawerSectionTitle>Ваши подписки</DrawerSectionTitle>
            {subsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
                <CircularProgress size={22} sx={{ color: 'rgba(142,123,255,0.7)' }} />
              </Box>
            ) : subsError ? (
              <DrawerEmptyText>Не удалось загрузить подписки</DrawerEmptyText>
            ) : subscriptionsWithLive.length === 0 ? (
              <DrawerEmptyText>У вас пока нет подписок</DrawerEmptyText>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {subscriptionsWithLive.map((card) => (
                  <Box key={card.nickname} sx={{ px: 0.5, py: 0.25, borderRadius: 1.5 }}>
                    <CardDrawer card={card} />
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}

        <DrawerSectionTitle>Другие эфиры</DrawerSectionTitle>
        {streamsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
            <CircularProgress size={22} sx={{ color: 'rgba(142,123,255,0.7)' }} />
          </Box>
        ) : streamsError ? (
          <DrawerEmptyText>Не удалось загрузить эфиры</DrawerEmptyText>
        ) : liveOutsideSubscriptions.length === 0 ? (
          <DrawerEmptyText>
            {liveAmongSubs ? 'Все текущие эфиры — среди ваших подписок' : 'Сейчас никто не стримит'}
          </DrawerEmptyText>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {liveOutsideSubscriptions.map((stream) => (
              <Box key={stream.streamId ?? stream.nickname} sx={{ px: 0.5, py: 0.25, borderRadius: 1.5 }}>
                <CardDrawer card={stream} />
              </Box>
            ))}
          </Box>
        )}
      </DrawerContainer>
    </StyledDrawer>
  );
};

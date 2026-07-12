import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { CardDrawer } from '../cardDrawer/CardDrawer';
import { useDrawer } from '../../context/DrawerContext';
import { useSidebarPanel } from '../../context/SidebarPanelContext';
import { StyledSidebar, StyledSidebarList, StyledSidebarListItem } from '../StylesComponents';
import { SIDEBAR_RAIL_MAX_LIVE, SIDEBAR_RAIL_MAX_SUBSCRIPTIONS } from './sidebar.constants';
import { buildSidebarLists } from './sidebar.utils';

const RailSectionMarker = ({
  title,
  accent,
  icon: Icon,
}: {
  title: string;
  accent: string;
  icon: typeof FavoriteBorderIcon;
}) => (
  <Tooltip title={title} placement="right">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        py: 1,
        px: 0.5,
      }}
    >
      <Box sx={{ width: 24, height: 2, borderRadius: 999, bgcolor: accent }} />
      <Icon sx={{ fontSize: 16, color: accent, opacity: 0.85 }} />
    </Box>
  </Tooltip>
);

const RailLoading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
    <CircularProgress size={18} sx={{ color: 'rgba(142,123,255,0.7)' }} />
  </Box>
);

const RailOverflow = ({ count, title }: { count: number; title: string }) => {
  const { setOpen } = useDrawer();
  if (count <= 0) return null;

  return (
    <Tooltip title={title} placement="right">
      <IconButton
        onClick={() => setOpen(true)}
        aria-label={title}
        sx={{
          width: 44,
          height: 28,
          mx: 'auto',
          color: 'rgba(255,255,255,0.65)',
          fontSize: 12,
          fontWeight: 700,
          border: '1px dashed rgba(255,255,255,0.18)',
          borderRadius: 1,
          '&:hover': { bgcolor: 'rgba(142,123,255,0.12)', color: '#fff' },
        }}
      >
        +{count}
      </IconButton>
    </Tooltip>
  );
};

const RailEmpty = ({ title }: { title: string }) => (
  <Tooltip title={title} placement="right">
    <Box
      sx={{
        width: 8,
        height: 8,
        mx: 'auto',
        my: 0.75,
        borderRadius: '50%',
        bgcolor: 'rgba(255,255,255,0.12)',
      }}
    />
  </Tooltip>
);

export const Sidebar = () => {
  const { setOpen } = useDrawer();
  const { streams, streamsLoading, subscribers, subsLoading, subsError, isAuth } = useSidebarPanel();

  const { subscriptionsWithLive, liveOutsideSubscriptions } = buildSidebarLists(subscribers, streams);

  const visibleSubs = subscriptionsWithLive.slice(0, SIDEBAR_RAIL_MAX_SUBSCRIPTIONS);
  const hiddenSubs = subscriptionsWithLive.length - visibleSubs.length;
  const visibleLive = liveOutsideSubscriptions.slice(0, SIDEBAR_RAIL_MAX_LIVE);
  const hiddenLive = liveOutsideSubscriptions.length - visibleLive.length;

  const liveAmongSubs = subscriptionsWithLive.some((s) => s.isOnline);
  const liveEmptyHint =
    liveAmongSubs && liveOutsideSubscriptions.length === 0 ? 'Эфиры ваших подписок — выше' : 'Сейчас никто не стримит';

  return (
    <StyledSidebar>
      <Box sx={{ px: 0.75, pt: 1.25, pb: 0.5 }}>
        <Tooltip title="Развернуть боковую панель" placement="right">
          <IconButton
            onClick={() => setOpen(true)}
            aria-label="Развернуть боковую панель"
            sx={{
              width: '100%',
              borderRadius: 1.5,
              py: 1,
              color: 'rgba(255,255,255,0.55)',
              '&:hover': {
                color: '#fff',
                bgcolor: 'rgba(255,255,255,0.06)',
              },
            }}
          >
            <FirstPageIcon sx={{ fontSize: 30, transform: 'rotate(180deg)' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <StyledSidebarList sx={{ flex: 1, px: 0.75, pb: 1 }}>
        {isAuth && (
          <>
            <RailSectionMarker title="Ваши подписки" accent="rgba(142,123,255,0.75)" icon={FavoriteBorderIcon} />
            {subsLoading ? (
              <RailLoading />
            ) : subsError ? (
              <RailEmpty title="Не удалось загрузить подписки" />
            ) : subscriptionsWithLive.length === 0 ? (
              <RailEmpty title="Нет подписок" />
            ) : (
              <>
                {visibleSubs.map((card) => (
                  <StyledSidebarListItem key={`sub-${card.nickname}`} sx={{ p: 0, justifyContent: 'center' }}>
                    <CardDrawer variant="compact" card={card} />
                  </StyledSidebarListItem>
                ))}
                <RailOverflow count={hiddenSubs} title={`Ещё ${hiddenSubs} подписок — открыть панель`} />
              </>
            )}
          </>
        )}

        <RailSectionMarker title="Сейчас в эфире" accent="rgba(235,70,70,0.85)" icon={LiveTvOutlinedIcon} />
        {streamsLoading ? (
          <RailLoading />
        ) : liveOutsideSubscriptions.length === 0 ? (
          <RailEmpty title={liveEmptyHint} />
        ) : (
          <>
            {visibleLive.map((stream) => (
              <StyledSidebarListItem key={stream.streamId ?? stream.nickname} sx={{ p: 0, justifyContent: 'center' }}>
                <CardDrawer variant="compact" card={stream} />
              </StyledSidebarListItem>
            ))}
            <RailOverflow count={hiddenLive} title={`Ещё ${hiddenLive} эфиров — открыть панель`} />
          </>
        )}
      </StyledSidebarList>
    </StyledSidebar>
  );
};

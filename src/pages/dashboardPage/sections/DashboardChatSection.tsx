import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { DashboardMode } from '../dashboard.constants';
import { useStreamBans } from '../../../hooks/useStreamBans';
import { StyledDashboardSectionHint, StyledDashboardSectionTitle } from '../StyledDashboardPage';

const formatBannedAt = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const DashboardChatSection = ({ channelNickname, mode }: { channelNickname: string; mode: DashboardMode }) => {
  const { bans, canManageChat, isLoading, error, actionError, unban } = useStreamBans(channelNickname, mode);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} sx={{ color: '#8e7bff' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <StyledDashboardSectionTitle>Настройки чата</StyledDashboardSectionTitle>
        <Typography sx={{ color: '#ff8a8a', fontSize: 14 }}>{error}</Typography>
      </Box>
    );
  }

  if (!canManageChat) {
    return (
      <Box>
        <StyledDashboardSectionTitle>Настройки чата</StyledDashboardSectionTitle>
        <StyledDashboardSectionHint>Недостаточно прав для управления чатом.</StyledDashboardSectionHint>
      </Box>
    );
  }

  return (
    <Box>
      <StyledDashboardSectionTitle>Настройки чата</StyledDashboardSectionTitle>
      <StyledDashboardSectionHint>
        {mode === 'own'
          ? 'Забаненные пользователи не могут писать в чат. Их сообщения скрываются.'
          : `Модерация чата канала ${channelNickname}.`}
      </StyledDashboardSectionHint>

      <Box sx={{ mt: 2 }}>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
            mb: 1.5,
          }}
        >
          <BlockOutlinedIcon sx={{ fontSize: 18, color: '#ff8a8a' }} />
          Забаненные
        </Typography>

        {actionError && <Typography sx={{ color: '#ff8a8a', fontSize: 13, mb: 2 }}>{actionError}</Typography>}

        {bans.length === 0 ? (
          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>Список банов пуст.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {bans.map((ban) => (
              <Box
                key={ban.userId}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Avatar
                  src={ban.profileImage ? `${process.env.REACT_APP_API_LOCAL}${ban.profileImage}` : undefined}
                  sx={{ width: 36, height: 36 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{ban.username}</Typography>
                  <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', mt: 0.25 }}>
                    {formatBannedAt(ban.bannedAt)}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => unban(ban.userId)}
                  sx={{
                    textTransform: 'none',
                    color: '#6fff79',
                    borderColor: 'rgba(111,255,121,0.35)',
                    '&:hover': {
                      borderColor: 'rgba(111,255,121,0.6)',
                      bgcolor: 'rgba(111,255,121,0.08)',
                    },
                  }}
                >
                  Разбанить
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

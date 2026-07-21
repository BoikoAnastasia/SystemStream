import { Box, Button, Typography } from '@mui/material';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { sanctionTypeLabel } from '../../../api/appealsApi';

type Props = {
  blocked: boolean;
  type?: string | null;
  reason?: string | null;
  expiresAt?: string | null;
  message?: string | null;
};

export const DashboardStreamingBanBanner = ({ blocked, type, reason, expiresAt, message }: Props) => {
  if (!blocked) return null;

  const until = expiresAt ? `до ${new Date(expiresAt).toLocaleString()}` : 'бессрочно';

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid rgba(229,57,53,0.55)',
        bgcolor: 'rgba(183,28,28,0.22)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GavelOutlinedIcon sx={{ color: '#ff8a80', fontSize: 22 }} />
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#ff8a80' }}>
          Эфир остановлен: {type ? sanctionTypeLabel(type) : 'бан стрима'}
        </Typography>
      </Box>

      {reason ? (
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', mb: 0.25 }}>
            Причина
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#fff', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
            {reason}
          </Typography>
        </Box>
      ) : message ? (
        <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.45 }}>{message}</Typography>
      ) : null}

      <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Срок: {until}</Typography>

      <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', lineHeight: 1.4 }}>
        OBS покажет только общую ошибку подключения. Подробности и обжалование — в поддержке.
      </Typography>

      <Button
        component={RouterLink}
        to="/settings/support"
        variant="outlined"
        size="small"
        sx={{
          alignSelf: 'flex-start',
          textTransform: 'none',
          color: '#ffcdd2',
          borderColor: 'rgba(255,138,128,0.45)',
          '&:hover': { borderColor: '#ff8a80', bgcolor: 'rgba(255,138,128,0.08)' },
        }}
      >
        Обжаловать в поддержке
      </Button>
    </Box>
  );
};

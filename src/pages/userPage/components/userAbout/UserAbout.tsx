import { Box, Typography } from '@mui/material';
import { IProfile } from '../../../../types/share';

const panelSx = {
  borderRadius: 2,
  bgcolor: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(16px)',
} as const;

export const UserAbout = ({ userData }: { userData: IProfile | null }) => {
  const description = userData?.profileDescription?.trim();

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ ...panelSx, p: { xs: 2, sm: 2.5 } }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#fff', mb: 1.25, lineHeight: 1.3 }}>
          Обо мне
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: description ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.4)',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontStyle: description ? 'normal' : 'italic',
          }}
        >
          {description || 'Стример пока не добавил описание канала.'}
        </Typography>
      </Box>
    </Box>
  );
};

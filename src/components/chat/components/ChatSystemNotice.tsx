import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const ChatSystemNotice = ({ text }: { text: string }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 0.75,
      py: 1,
      px: 1.5,
      my: 0.25,
    }}
  >
    <InfoOutlinedIcon sx={{ fontSize: 14, color: 'rgba(184,173,255,0.75)', mt: '2px', flexShrink: 0 }} />
    <Typography
      sx={{
        fontSize: 12,
        lineHeight: 1.45,
        color: 'rgba(255,255,255,0.55)',
        textAlign: 'center',
        fontStyle: 'italic',
      }}
    >
      {text}
    </Typography>
  </Box>
);

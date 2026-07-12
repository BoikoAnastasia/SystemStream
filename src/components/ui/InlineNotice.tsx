import { Alert, AlertProps } from '@mui/material';

const NOTICE_STYLES: Record<
  NonNullable<AlertProps['severity']>,
  { bgcolor: string; color: string; border: string; icon: string }
> = {
  success: {
    bgcolor: 'rgba(111,255,121,0.1)',
    color: '#6fff79',
    border: 'rgba(111,255,121,0.25)',
    icon: '#6fff79',
  },
  error: {
    bgcolor: 'rgba(255,138,138,0.1)',
    color: '#ff8a8a',
    border: 'rgba(255,138,138,0.25)',
    icon: '#ff8a8a',
  },
  warning: {
    bgcolor: 'rgba(255,193,7,0.1)',
    color: '#ffc857',
    border: 'rgba(255,193,7,0.28)',
    icon: '#ffc857',
  },
  info: {
    bgcolor: 'rgba(142,123,255,0.1)',
    color: '#b8adff',
    border: 'rgba(142,123,255,0.25)',
    icon: '#b8adff',
  },
};

export const InlineNotice = ({
  message,
  severity = 'success',
  onClose,
}: {
  message: string | null;
  severity?: AlertProps['severity'];
  onClose?: () => void;
}) => {
  if (!message) return null;

  const palette = NOTICE_STYLES[severity ?? 'success'];

  return (
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{
        bgcolor: palette.bgcolor,
        color: palette.color,
        border: `1px solid ${palette.border}`,
        '& .MuiAlert-icon': { color: palette.icon },
      }}
    >
      {message}
    </Alert>
  );
};

import { Alert, AlertProps } from '@mui/material';

export const DashboardSaveNotice = ({
  message,
  severity = 'success',
  onClose,
}: {
  message: string | null;
  severity?: AlertProps['severity'];
  onClose?: () => void;
}) => {
  if (!message) return null;

  return (
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{
        bgcolor: severity === 'success' ? 'rgba(111,255,121,0.1)' : 'rgba(255,138,138,0.1)',
        color: severity === 'success' ? '#6fff79' : '#ff8a8a',
        border: `1px solid ${severity === 'success' ? 'rgba(111,255,121,0.25)' : 'rgba(255,138,138,0.25)'}`,
        '& .MuiAlert-icon': { color: severity === 'success' ? '#6fff79' : '#ff8a8a' },
      }}
    >
      {message}
    </Alert>
  );
};

import { AlertProps } from '@mui/material';
import { InlineNotice } from '../../../components/ui/InlineNotice';

export const DashboardSaveNotice = ({
  message,
  severity = 'success',
  onClose,
}: {
  message: string | null;
  severity?: AlertProps['severity'];
  onClose?: () => void;
}) => <InlineNotice message={message} severity={severity} onClose={onClose} />;

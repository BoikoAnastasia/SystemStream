import { Box, Button, Modal } from '@mui/material';
import { AlertType } from '../../types/share';
import { StyleModalContent, StyledAlertAccent, StyledAlertText, StyledAlertTitle } from './StyledModal';

interface IMessageProps {
  type?: AlertType;
  title?: string | null;
  message: string;
  open: boolean;
  onClose: () => void;
}

const defaultTitle = (type: AlertType) => {
  switch (type) {
    case 'error':
      return 'Ошибка';
    case 'warning':
      return 'Внимание';
    case 'success':
      return 'Готово';
    default:
      return 'Уведомление';
  }
};

export const ModalAlert = ({ type = 'info', title, message, open, onClose }: IMessageProps) => {
  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        // Only close via the button — not backdrop / Escape.
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        onClose();
      }}
      disableEscapeKeyDown
      aria-labelledby="modal-alert-title"
      aria-describedby="modal-alert-message"
      sx={{
        '& .MuiModal-backdrop': {
          backgroundColor: 'rgba(8, 7, 16, 0.72)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <StyleModalContent>
        <StyledAlertAccent type={type} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <StyledAlertTitle id="modal-alert-title" type={type}>
            {title?.trim() || defaultTitle(type)}
          </StyledAlertTitle>
          <StyledAlertText id="modal-alert-message">{message}</StyledAlertText>
        </Box>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            alignSelf: 'flex-end',
            mt: 0.5,
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            bgcolor: '#6d5dfb',
            boxShadow: 'var(--boxShadowButton)',
            '&:hover': { bgcolor: '#8e7bff' },
          }}
        >
          Закрыть
        </Button>
      </StyleModalContent>
    </Modal>
  );
};

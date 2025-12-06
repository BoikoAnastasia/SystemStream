import { useEffect } from 'react';
import { Modal } from '@mui/material';
import { StyledAlertText, StyledFollowButton, StyleModalContent } from '../StylesComponents';
import { AlertType } from '../../types/share';

interface IMessageProps {
  type?: AlertType;
  message: string;
  open: boolean;
  onClose: (open: boolean) => void;
}

export const ModalAlert = ({ type = 'info', message, open, onClose }: IMessageProps) => {
  const switchColorText = (type: AlertType) => {
    switch (type) {
      case 'error':
        return 'var(--error)';
      case 'warning':
        return 'var(--warning)';
      case 'success':
        return 'var(--success)';
      case 'info':
        return 'var(--white)';
      default:
        return 'var(--white)';
    }
  };

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => onClose(false), 5000);
    return () => clearTimeout(timer);
  }, [onClose, open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-alert"
      aria-describedby="modal-alert-message"
      sx={{
        '& .MuiModal-backdrop': {
          backgroundColor: 'var(--modal-background)',
        },
      }}
    >
      <StyleModalContent>
        <StyledAlertText type={switchColorText(type)}>{message}</StyledAlertText>
        <StyledFollowButton onClick={() => onClose(false)}>Принять</StyledFollowButton>
      </StyleModalContent>
    </Modal>
  );
};

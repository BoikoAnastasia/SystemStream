import { memo, useState, useEffect } from 'react';
// context
import { useHeaderModal } from '../../context/HeaderModalContext';
// components
import { FormLogin } from '../formLogin/FormLogin';
import { FormAuth } from '../formRegistr/FormRegistr';
import { TabsComponent } from '../ui/tabs/TabsComponent';
// mui
import Modal from '@mui/material/Modal';
// style
import { StyledTitleModal, StyleModalContent } from '../StylesComponents';

export const ModalComponent = memo(
  ({ title, open, setOpen }: { title: string; open: boolean; setOpen: (open: boolean) => void }) => {
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState<null | string>(null);

    useEffect(() => {
      if (open) {
        setMessage(null);
      }
    }, [open]);

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& .MuiModal-backdrop': {
            backgroundColor: 'var(--modal-background)',
          },
        }}
      >
        <StyleModalContent>
          <StyledTitleModal>{title}</StyledTitleModal>
          {message !== null && message}
          <TabsComponent
            propsChild={[
              <FormLogin handleClose={handleClose} setMessage={setMessage} />,
              <FormAuth setMessage={setMessage} />,
            ]}
            propTabsTitle={['Вход', 'Регистрация']}
          />
        </StyleModalContent>
      </Modal>
    );
  }
);

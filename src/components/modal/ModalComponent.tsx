import { memo, useState, useEffect } from 'react';
// context
// import { useHeaderModal } from '../../context/HeaderModalContext';
// components
import { FormLogin } from '../formLogin/FormLogin';
import { FormAuth } from '../formRegistr/FormRegistr';
import { TabsComponent } from '../ui/tabs/TabsComponent';
// mui
import Modal from '@mui/material/Modal';
// style
import { StyledTitleModal } from '../StylesComponents';
import { StyleModalContent } from './StyledModal';

export const ModalComponent = memo(
  ({
    title,
    open,
    setOpen,
    initialTab = 0,
  }: {
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    /** 0 = Вход, 1 = Регистрация */
    initialTab?: number;
  }) => {
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
          {/* key remounts tabs so initialTab applies each open */}
          {open && (
            <TabsComponent
              key={initialTab}
              initialTab={initialTab}
              propsChild={[
                <FormLogin handleClose={handleClose} setMessage={setMessage} />,
                <FormAuth handleClose={handleClose} setMessage={setMessage} />,
              ]}
              propTabsTitle={['Вход', 'Регистрация']}
            />
          )}
        </StyleModalContent>
      </Modal>
    );
  }
);

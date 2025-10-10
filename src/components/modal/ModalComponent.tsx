import { SetStateAction, Dispatch, memo } from 'react';
// components
import { FormLogin } from '../formLogin/FormLogin';
import { FormAuth } from '../formAuth/FormAuth';
import { TabsComponent } from '../ui/tabs/TabsComponent';
// mui
import Modal from '@mui/material/Modal';
// style
import { StyledTitleModal, StyleModalContent } from '../StylesComponents';

export const ModalComponent = memo(
  ({ title, open, setOpen }: { title: string; open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const handleClose = () => setOpen(false);

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
          <TabsComponent propsChild={[<FormLogin />, <FormAuth />]} propTabsTitle={['Войти', 'Регистрация']} />
        </StyleModalContent>
      </Modal>
    );
  }
);

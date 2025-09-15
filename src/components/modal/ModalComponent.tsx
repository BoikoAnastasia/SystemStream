import { SetStateAction, Dispatch } from 'react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { FormLogin } from '../formLogin/FormLogin';
import { FormAuth } from '../formAuth/FormAuth';
import { TabsComponent } from '../ui/tabs/TabsComponent';

export const ModalComponent = ({
  title,
  open,
  setOpen,
}: {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    minWidth: '360px',
    bgcolor: 'var(--background)',
    border: 'none',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    fontSize: '28px',
    borderRadius: '12px',
  };

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
      <Box sx={style}>
        <h3 style={{ fontSize: '28px', padding: '20px 16px' }}>{title}</h3>
        <TabsComponent propsChild={[<FormLogin />, <FormAuth />]} propTabsTitle={['Войти', 'Регистрация']} />
      </Box>
    </Modal>
  );
};

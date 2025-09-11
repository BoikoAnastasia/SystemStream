import { SetStateAction, Dispatch, useState } from 'react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import { FormLogin } from '../formLogin/FormLogin';
import { FormAuth } from '../formAuth/FormAuth';
import { StyledTabs } from '../StylesComponents';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        style={{ width: '100%' }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
        <StyledTabs sx={{ width: '100%' }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Войти" {...a11yProps(0)} />
          <Tab label="Регистрация" {...a11yProps(1)} />
        </StyledTabs>
        <CustomTabPanel value={value} index={0}>
          <FormLogin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <FormAuth />
        </CustomTabPanel>
      </Box>
    </Modal>
  );
};

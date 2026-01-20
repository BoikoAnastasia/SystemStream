import LoginIcon from '@mui/icons-material/Login';
import { Button, styled } from '@mui/material';

export const ButtonLogIn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <StyledButtonLogIn onClick={onClick}>
      <LoginIcon fontSize="small" />
    </StyledButtonLogIn>
  );
};

export const StyledButtonLogIn = styled(Button)(() => ({
  minWidth: '40px',
  height: '40px',
  color: 'var(--white)',
  padding: '0',
  borderRadius: '50%',
  backgroundColor: 'var(--button-dark)',
}));

import LoginIcon from '@mui/icons-material/Login';
import { StyledButtonLogIn } from '../../StylesComponents';

export const ButtonLogIn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <StyledButtonLogIn onClick={onClick}>
      <LoginIcon fontSize="small" />
    </StyledButtonLogIn>
  );
};

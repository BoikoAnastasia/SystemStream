import { Box, styled, TextField } from '@mui/material';
import { StyledButtonSearchProps } from '../../../types/share';
import SearchIcon from '@mui/icons-material/Search';

export const StyledSearchContainer = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
}));

export const StyledButtonSearch = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'h',
})<StyledButtonSearchProps>(({ h }) => ({
  width: '100%',
  height: h || '40px',
  maxWidth: '100%',
  backgroundColor: 'var(--button-dark)',
  borderRadius: '20px',
  '& .MuiInputBase-root': {
    minWidth: '200px',
    height: '100%',
    borderRadius: '20px',
    color: 'var(--white)',
    padding: '8px 0 8px 35px',
  },
}));

export const StyledSearchIcon = styled(SearchIcon)(() => ({
  position: 'absolute',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'var(--white)',
  mr: 1,
  my: 0.5,
}));

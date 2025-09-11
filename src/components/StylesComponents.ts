import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, InputLabel, OutlinedInput, Tabs, TextField, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { IStyledIButtonForm } from '../types/share';

const Rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }`;

export const StyledloadingCircle = styled(Typography)(() => ({
  width: '60px',
  height: '60px',
  display: 'block',
  borderRadius: '50%',
  border: '3px dashed blue',
  margin: '0 auto',
  animation: `${Rotate} 2.0s infinite linear`,
}));

export const StyledButtonsForm = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  '& > button': {
    width: '100%',
    borderRadius: '50px',
  },
}));

export const StyledButtonLogIn = styled(Button)(() => ({
  minWidth: '40px',
  height: '40px',
  color: 'white',
  padding: '0',
  borderRadius: '50%',
  backgroundColor: 'var(--button-dark)',
}));

export const StyledButtonSearch = styled(TextField)(() => ({
  width: '160px',
  maxWidth: '100%',
  backgroundColor: 'var(--button-dark)',
  borderRadius: '20px',
  '& .MuiInputBase-root': {
    minWidth: '160px',
    height: '40px',
    borderRadius: '20px',
    color: 'white',
    padding: '8px 0 8px 35px',
  },
}));

// Modal form
export const StyledTabs = styled(Tabs)(() => ({
  width: '100%',
  borderBottom: '1px solid',
  '& .MuiButtonBase-root.Mui-selected': {
    color: 'white',
  },
  '& .MuiButtonBase-root': {
    color: 'var(--sidebar)',
    textTransform: 'none',
  },
}));

export const StyledTextFieldModal = styled(TextField)(() => ({
  width: '100%',
  // Input text color
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
  // Label color
  '& .MuiInputLabel-root': {
    color: 'var(--input-border)',
    '&.Mui-focused': {
      color: 'white',
    },
  },
  // Border color (default, hover, focused)
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '12px',
    borderColor: 'var(--input-border)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
}));

export const StyledOutlinedInputModal = styled(OutlinedInput)(() => ({
  // Change label color
  '& .MuiInputLabel-root': {
    color: 'var(--input-border)',
    '&.Mui-focused': {
      color: 'orange', // Focused label color
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '12px',
    borderColor: 'var(--input-border)',
  },
  // Change input text color
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
}));

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: 'var(--input-border)',
  '&.Mui-focused': {
    color: 'white',
  },
}));

export const StyledIconButton = styled(IconButton)(() => ({
  color: 'var(--input-border)',
  '&:hover': {
    color: 'white',
  },
}));

export const StyledIButtonForm = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'bgcolor' && prop !== 'hoverbgcolor' && prop !== 'c' && prop !== 'hovercolor',
})<IStyledIButtonForm>(({ bgcolor, hovercolor, hoverbgcolor, c }) => ({
  fontWeight: '600',
  minHeight: '40px',
  color: c || 'var(--black)',
  backgroundColor: bgcolor || 'var(--button-light)',
  textTransform: 'none',
  '&:hover': {
    color: hovercolor || 'white',
    backgroundColor: hoverbgcolor || 'var(--button-light-hover)',
  },
}));

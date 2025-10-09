import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  InputLabel,
  OutlinedInput,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { IStyledButtonDark, IStyledIButtonForm, IStyledListVideo } from '../types/share';

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

interface StyledButtonSearchProps {
  h?: string;
}

export const StyledButtonSearch = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'h',
})<StyledButtonSearchProps>(({ h }) => ({
  width: '100%',
  height: h || '40px',
  maxWidth: '100%',
  backgroundColor: 'var(--button-dark)',
  borderRadius: '12px',
  '& .MuiInputBase-root': {
    minWidth: '160px',
    height: '100%',
    borderRadius: '12px',
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
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
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

// ListVideo
export const StyledBoxListVideo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
}));

export const StyledListVideo = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'columns' && prop !== 'columnsMb',
})<IStyledListVideo>(({ columns, columnsMb }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns ? columns : 4}, 1fr)`,
  gap: '12px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: `repeat(${columnsMb ? columnsMb : 2}, 1fr)`,
  },
}));

export const StyledCardVideo = styled(Card)(() => ({
  background: 'none',
  '&.MuiPaper-root': {
    border: 'none',
    boxShadow: 'none',
  },
}));

export const StyledUserHeaderBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px 0',
  gap: '20px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    padding: '0',
  },
}));

export const StyledButtonLight = styled(Button)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  minWidth: '40px',
  height: '40px',
  fontWeight: 'bold',
  color: 'var(--background-block)',
  padding: '10px 20px',
  borderRadius: '20px',
  textTransform: 'none',
  backgroundColor: 'var(--button-light)',
}));

export const StyledButtonDark = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'br' && prop !== 'h',
})<IStyledButtonDark>(({ br, h }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  minWidth: h || '40px',
  height: h || '40px',
  fontWeight: 'bold',
  color: 'var(--white)',
  padding: '10px 20px',
  borderRadius: br || '20px',
  textTransform: 'none',
  backgroundColor: 'var(--button-dark)',
}));

// StreamPage
export const StyledStreamBoxAbout = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px',
}));

// Chat
export const StyledChatList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  flex: 1,
  padding: '20px 16px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'var(--background-block)', // фон трека
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'var(--button-dark-hover)', // цвет ползунка
    borderRadius: '5px',
    border: 'none', // отступ вокруг ползунка
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'var(--black)', // при наведении
  },
  // // Для Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--button-dark-hover) var(--background-block)',
}));

export const StyledChatCard = styled(Box)(() => ({
  display: 'grid',
  gridTemplateAreas: `'img nickname' 'img message'`,
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  gap: '4px 12px',
}));

export const StyledChatCardImg = styled(Avatar)(() => ({
  gridArea: 'img',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center',
}));

export const StyledChatCardNickname = styled(Box)(() => ({
  gridArea: 'nickname',
  fontSize: '13px',
}));

export const StyledChatCardMessage = styled(Box)(() => ({
  gridArea: 'message',
  fontSize: '16px',
  padding: '12px 16px',
  borderRadius: '12px',
  background: 'var(--button-dark)',
  wordBreak: 'break-word',
}));

export const StyledChatCardMessageCurrentUser = styled(Box)(() => ({
  gridArea: 'message',
  fontSize: '16px',
  padding: '12px 16px',
  color: 'var(--input-background)',
  borderRadius: '12px',
  background: 'var(--button-light)',
  wordBreak: 'break-word',
}));

export const StyledChatTextField = styled(TextField)(() => ({
  background: 'var(--button-dark)',
  borderRadius: '12px',
  width: '100%',
  // Input text color
  '& .MuiOutlinedInput-input': {
    color: 'white',
    paddingRight: '40px',
  },
  '& .MuiFormControl-root': {
    borderColor: 'white',
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
  },
}));

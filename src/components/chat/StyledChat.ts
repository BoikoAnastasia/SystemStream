import { Box, styled, TextField } from '@mui/material';

export const StyledChatList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  flex: 1,
  minHeight: '250px',
  padding: '20px 16px',
  overflowY: 'auto',
  justifyContent: 'flex-end',
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
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
}));

export const StyledChatCardNickname = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'customColor',
})(({ customColor }: { customColor: string }) => ({
  fontSize: '16px',
  color: customColor || 'white',
}));

export const StyledChatCardMessage = styled(Box)(() => ({
  fontSize: '14px',
  wordBreak: 'break-word',
}));

export const StyledChatTextField = styled(TextField)(() => ({
  flex: '0 0 auto',
  width: '100%',
  borderRadius: '12px',
  background: 'var(--button-dark)',
  // Input text color
  '& .MuiOutlinedInput-input': {
    color: 'var(--white)',
    paddingRight: '40px',
  },
  '& .MuiFormControl-root': {
    borderColor: 'var(--white)',
  },
  // Label color
  '& .MuiInputLabel-root': {
    color: 'var(--input-border)',
    '&.Mui-focused': {
      color: 'var(--white)',
    },
  },
  // Border color (default, hover, focused)
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '12px',
  },
}));

export const StyledChatContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
  minWidth: '250px',
}));

export const StyledChatHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid var(--sidebar)',
}));

export const StyledChatContainerMessages = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  marginTop: '20px',
}));

// element.style {
//     position: sticky;
//     z-index: 10;
//     background: black;
//     width: 100%;
//     bottom: 0;

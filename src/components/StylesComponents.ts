import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { IStyledButtonDark, IStyledButtonForm, IStyledListVideo } from '../types/share';

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
  border: '3px dashed white',
  margin: '0 auto',
  animation: `${Rotate} 2.0s infinite linear`,
}));

export const ContainerBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '10px 15px',
}));

export const StyledBannerUserName = styled('h1')(() => ({
  fontSize: '60px',
  fontWeight: 'bold',
  color: 'var(--white)',
  '@media (max-width: 1024px)': {
    fontSize: '40px',
  },
}));

export const StyledBannerUserInfo = styled('h1')(() => ({
  fontSize: '34px',
  fontWeight: 400,
  color: '#bbb',
  '@media (max-width: 1024px)': {
    fontSize: '24px',
  },
}));

export const StyledTitle = styled('h2')(() => ({
  fontSize: '28px',
  fontWeight: 'bold',
  color: 'var(--white)',
}));

export const StyledTitleH3 = styled('h3')(() => ({
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '20px',
}));

export const StyledTitleModal = styled('h3')(() => ({
  fontSize: '28px',
  fontWeight: 'bold',
  padding: '20px 16px',
}));

export const StyledNameComponents = styled('h4')(() => ({
  fontSize: '18px',
  fontWeight: 500,
  color: 'white',
}));

export const StyledSpanDark = styled('span')(() => ({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 1.2,
  color: 'var(--background-line)',
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
  borderRadius: '20px',
  '& .MuiInputBase-root': {
    minWidth: '200px',
    height: '100%',
    borderRadius: '20px',
    color: 'white',
    padding: '8px 0 8px 35px',
  },
}));

// Tabs
export const StyledTabs = styled(Tabs)(() => ({
  display: 'inline-flex',
  justifyContent: 'center',
  width: '100%',
  margin: '0 auto',
  padding: '4px',
  borderBottom: 'none',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.06)',
  scrollbarWidth: 'thin',
  '& .MuiTabs-list': {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  '& ::-webkit-scrollbar': {
    height: '5px',
    background: 'rgba(5, 5, 17, 0.43)',
    borderRadius: '5px',
  },
  '&.MuiTabs-root': {
    width: 'auto',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },

  '& .MuiTabs-flexContainer': {
    gap: '10px',
  },
  '@media (max-width: 768px)': {
    width: '100% !important',
    overflowX: 'auto',
    '& .MuiTabs-scroller': {
      overflowX: 'auto !important',
      '&::-webkit-scrollbar': { display: 'none' },
    },
  },
}));

export const StyledTab = styled(Tab)(() => ({
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  color: '#A1A1B5',
  minHeight: 36,
  minWidth: 90,
  borderRadius: '10px',
  transition: 'all 0.25s ease',
  background: 'transparent',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
  },

  '&.Mui-selected': {
    color: '#fff',
    background: 'linear-gradient(135deg, #6D5DFB 0%, #8E7BFF 100%)',
    boxShadow: '0 4px 12px rgba(109, 93, 251, 0.35)',
  },
}));
// modal
export const StyleModalContent = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  minWidth: '360px',
  backgroundColor: 'var(--background)',
  border: 'none',
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  fontSize: '28px',
  borderRadius: '12px',
}));

export const StyledTextFieldModal = styled(TextField)(() => ({
  width: '100%',
  // Input text color
  '& .MuiOutlinedInput-input': {
    color: 'white',
    // Стили для автозаполнения
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
      caretColor: 'white',
      borderRadius: '12px', // Добавляем скругление
    },
    '&:-webkit-autofill:hover': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
    },
    '&:-webkit-autofill:focus': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
    },
    '&:-webkit-autofill:active': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
    },
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
  // Убираем стандартные стили автозаполнения
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
}));

export const StyledOutlinedInputModal = styled(OutlinedInput)(() => ({
  // Change label color
  '& .MuiInputLabel-root': {
    color: 'var(--input-border)',
    '&.Mui-focused': {
      color: 'white',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '12px',
    borderColor: 'var(--input-border)',
  },
  // Change input text color
  '& .MuiInputBase-input': {
    color: 'white',
    // Стили для автозаполнения
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
      caretColor: 'white',
      borderRadius: '12px',
      border: 'none', // Убираем бордер
      outline: 'none', // Убираем outline
    },
    '&:-webkit-autofill:hover': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
      border: 'none',
      outline: 'none',
    },
    '&:-webkit-autofill:focus': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
      border: 'none',
      outline: 'none',
    },
    '&:-webkit-autofill:active': {
      WebkitBoxShadow: '0 0 0 100px var(--background) inset',
      WebkitTextFillColor: 'white',
      border: 'none',
      outline: 'none',
    },
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  // Убираем внутренние бордеры
  '& .MuiOutlinedInput-input': {
    border: 'none',
    outline: 'none',
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

export const StyledButtonForm = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'bgcolor' && prop !== 'hoverbgcolor' && prop !== 'c' && prop !== 'hovercolor',
})<IStyledButtonForm>(({ bgcolor, hovercolor, hoverbgcolor, c }) => ({
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
  gap: '5px',
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

export const StyledChatCardMessageCurrentUser = styled(Box)(() => ({
  gridArea: 'message',
  fontSize: '16px',
  color: 'var(--input-background)',
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

export const StyledHeaderStreamPage = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '20px 0',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '20px',
  },
}));

export const StyledButtonLive = styled(Box)(() => ({
  display: 'flex',
  fontSize: '14px',
  height: 'min-content',
  whiteSpace: 'nowrap',
  padding: '5px 10px',
  borderRadius: '5px',
  color: 'white',
  background: 'red',
}));

export const StyledButtonWathers = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '10px',
  height: 'min-content',
  minWidth: 'min-content',
  whiteSpace: 'nowrap',
  padding: '5px',
  color: 'white',
  background: 'var(--modal-background)',
}));

// StyledSidebar
export const StyledSidebar = styled(Box)(() => ({
  position: 'sticky',
  top: '0',
  left: '0',
  display: 'flex',
  minHeight: '100%',
  background: 'linear-gradient(180deg, rgb(5, 5, 17), rgb(3, 5, 17))',
  zIndex: '1000',
  overflow: 'hidden',
  transition: 'all .3s ease',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

export const StyledSidebarName = styled('div')({
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: '#6E6E84',
  letterSpacing: '0.5px',
  marginTop: '16px',
  marginBottom: '8px',
});

export const StyledSidebarList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const StyledSidebarListItem = styled(ListItem)({
  padding: '8px 12px',
  borderRadius: '12px',
  transition: 'all 0.25s ease',
  '&:hover': {
    background: '#13152c',
  },
});

export const StyledSidebarLink = styled(Link)({
  textDecoration: 'none',
  color: '#A1A1B5',
  fontSize: '15px',
  fontWeight: 500,
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  transition: 'color 0.25s ease',

  '&:hover': {
    color: '#ffffff',
  },
  '&.active': {
    color: '#fff',
    background: 'linear-gradient(90deg, rgba(109,93,251,0.15) 0%, rgba(142,123,255,0.05) 100%)',
    borderRadius: '12px',
  },
});

// Drawer
export const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: '250px',
    height: '100%',
    minWidth: '250px',
    padding: '25px 16px 0',
    background: 'linear-gradient(180deg, rgb(5, 5, 17), rgb(3, 5, 17))',
  },
  '@media (max-width: 768px)': {
    '& .MuiDrawer-paper': {
      width: '40%',
    },
  },
}));

// userProfile

export const ContainerProfileComponents = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  padding: '40px 0',
}));

export const StyledProfileSection = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '550px',
  padding: '20px 60px 40px',
  borderRadius: '20px',
  overflow: 'hidden',
  '@media (max-width: 1024px)': {
    flexDirection: 'column',
    padding: '10px',
  },
});

export const StyledInfo = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '6px',
  maxWidth: '50%',
  zIndex: 2,
  '@media (max-width: 768px)': {
    maxWidth: '100%',
  },
});

export const StyledBannerAvatar = styled(Avatar)(() => ({
  position: 'absolute',
  height: '100%',
  width: '56%',
  right: 0,
  bottom: 0,
  borderRadius: 0,
  objectFit: 'cover',
  '@media (max-width: 1024px)': {
    height: '70%',
    width: '73%',
  },
  '@media (max-width: 768px)': {
    height: '65%',
    width: '100%',
  },
}));

export const StyledFollowButton = styled(Button)({
  fontSize: '0.95rem',
  fontWeight: 600,
  marginTop: '10px',
  padding: '8px 28px',
  color: 'white',
  borderRadius: '10px',
  background: 'linear-gradient(90deg, #6557ff 0%, #8f6eff 100%)',
  textTransform: 'none',
  '&:hover': { background: 'linear-gradient(90deg, #786aff 0%, #a88bff 100%)' },
});

export const StyledAboutSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  lineHeight: 1.6,
});

export const StyledSocials = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '0 20px',
});

export const StyledVideoSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const StyledVideoGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '20px',
  padding: '0 20px',
});

export const StyledBoxEffect = styled(Box)(() => ({
  position: 'absolute',
  display: 'block',
  listStyle: 'none',
  animation: `${effect} 3s ease-in-out infinite alternate`,
  backgroundImage: 'linear-gradient(-20deg, #2c2573ff 50%, #0000 50%)',
  bottom: 0,
  top: 0,
  left: '-50%',
  right: '-50%',
  opacity: 0.2,
  zIndex: -1,
}));

const effect = keyframes`
  from {
    transform: translateX(-25%);
  }
  to {
    transform: translateX(25%);
  }
}`;

export const StyledVideoCard = styled(Card)({
  position: 'relative',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '16px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    background: 'rgba(255,255,255,0.08)',
  },
});

export const StyledVideoCardLink = styled(Link)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 1,
});

// UserSchedule

export const StyledFilters = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

export const StyledFilterButton = styled(Button)({
  padding: '4px 12px',
  background: 'rgba(255, 255, 255, 0.06)',
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  color: '#A1A1B5',
  height: 45,
  minWidth: 90,
  borderRadius: '10px',
  transition: 'all 0.25s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
  },
  '&.active': {
    color: '#fff',
    background: 'linear-gradient(135deg, #6D5DFB 0%, #8E7BFF 100%)',
    boxShadow: '0 4px 12px rgba(109, 93, 251, 0.35)',
  },
});

export const StyledScheduleFormControl = styled(FormControl)({
  color: '#A1A1B5',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.06)',
  width: '25%',
  height: 45,
  '@media (max-width: 768px)': {
    width: '100%',
  },
});

export const StyledScheduleInputLabel = styled(InputLabel)({
  width: '100%',
  color: '#A1A1B5',
  '&.Mui-focused': {
    color: '#A1A1B5',
  },
  '& MuiOutlinedInput-input': {
    borderColor: '#A1A1B5',
  },
});

export const StyledScheduleSelect = styled(Select)(() => ({
  width: '100%',
  color: '#A1A1B5',
  height: 45,
  // // Border color (default, hover, focused)
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '12px',
    borderColor: '#A1A1B5 !important',
  },
  '& .MuiSelect-icon': {
    color: '#A1A1B5',
  },
}));

export const StyledScheduleCard = styled(Card)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '20px',
  borderRadius: '12px',
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.08)',
  },
});

export const StyledButtonReminder = styled(Button)({
  display: 'inline-flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '1.125rem',
  color: 'white',
  borderRadius: '5px',
  padding: '5px 15px',
  background: 'rgba(255, 255, 255, 0.03)',
  textTransform: 'none',
});

export const StyledScheduleCardText = styled(Typography)({
  fontSize: '1rem',
  color: '#cccfd8ff',
});

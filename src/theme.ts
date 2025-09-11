import { createTheme } from '@mui/material/styles';
// TODO не доделано
// доделать измение цвета

const themeColors = {
  primary: '#ffffff',
  warning: '#fff52d',
  secondary: '#BF94FF',
  background: '#1F1F23',
  backgroundBlock: '#323239',
  black: '#000000',
  white: '#ffffff',
  error: '#EB0400',
  success: '#6fff79',
} as const;

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: themeColors.white,
      light: themeColors.primary,
    },
    secondary: {
      main: '#fff52d',
    },
  },
});

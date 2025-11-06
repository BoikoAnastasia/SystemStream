// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: "Inter", "Roboto", "Helvetica", "Arial", sans-serif;
        }
      `,
    },
  },
});

export default theme;

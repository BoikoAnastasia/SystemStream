import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// redux, store
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
// components
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Providers } from './Providers';
// styles, theme
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './index.css';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Providers>
            <App />
          </Providers>
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

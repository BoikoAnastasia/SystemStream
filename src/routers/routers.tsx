import { lazy } from 'react';

const MainPage = lazy(() =>
  import('../pages/mainPage/MainPage').then(({ MainPage }) => ({
    default: MainPage,
  }))
);

const UserPage = lazy(() =>
  import('../pages/userPage/UserPage').then(({ UserPage }) => ({
    default: UserPage,
  }))
);

// const StreamPage = lazy(() =>
//   import('../pages/streamPage/StreamPage').then(({ StreamPage }) => ({
//     default: StreamPage,
//   }))
// );

const SettingsPage = lazy(() =>
  import('../pages/settingsPage/SettingsPage').then(({ SettingsPage }) => ({
    default: SettingsPage,
  }))
);

export const routers = [
  { path: '/', Element: MainPage },
  { path: '/:nickname', Element: UserPage },
  // { path: '/stream', Element: StreamPage },
  { path: '/settings', Element: SettingsPage },
];

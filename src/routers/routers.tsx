import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

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

export const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export const routers = [
  { path: '/', Element: MainPage },
  { path: '/:nickname', Element: UserPage },
  // { path: '/stream', Element: StreamPage },
];

export const privateRouters = [{ path: '/settings', Element: SettingsPage }];

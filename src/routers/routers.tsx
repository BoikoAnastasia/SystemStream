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

const DashboardPage = lazy(() =>
  import('../pages/dashboardPage/DashboardPage').then(({ DashboardPage }) => ({
    default: DashboardPage,
  }))
);

const ChannelManagePage = lazy(() =>
  import('../pages/dashboardPage/ChannelManagePage').then(({ ChannelManagePage }) => ({
    default: ChannelManagePage,
  }))
);

const StaffPage = lazy(() =>
  import('../pages/staffPage/StaffPage').then(({ StaffPage }) => ({
    default: StaffPage,
  }))
);

// TEMP: demo-плеер — удалить вместе с pages/playerDemo/
const PlayerDemoPage = lazy(() =>
  import('../pages/playerDemo/PlayerDemoPage').then(({ PlayerDemoPage }) => ({
    default: PlayerDemoPage,
  }))
);

export const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export const routers = [
  { path: '/', Element: MainPage },
  // TEMP: demo-плеер — удалить строку + pages/playerDemo/ (должен быть ВЫШЕ /:nickname)
  { path: '/player-demo', Element: PlayerDemoPage },
  { path: '/:nickname', Element: UserPage },
  // { path: '/stream', Element: StreamPage },
];

export const privateRouters = [
  { path: '/settings', Element: SettingsPage },
  { path: '/settings/:section', Element: SettingsPage },
  { path: '/dashboard', Element: DashboardPage },
  { path: '/dashboard/:section', Element: DashboardPage },
  { path: '/staff', Element: StaffPage },
  { path: '/staff/:section', Element: StaffPage },
  { path: '/:nickname/manage', Element: ChannelManagePage },
  { path: '/:nickname/manage/:section', Element: ChannelManagePage },
];

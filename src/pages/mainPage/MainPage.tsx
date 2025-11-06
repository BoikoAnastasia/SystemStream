import { FC, JSX } from 'react';
// layout
import { appLayout } from '../../layout/index';
// components
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox } from '../../components/StylesComponents';
import { CatalogUsers } from '../../components/catalogUsers/CatalogUsers';
// mui
import { Box } from '@mui/material';
// types
import { IUser, IVideoItem } from '../../types/share';

export const MainPage: FC = appLayout((): JSX.Element => {
  const testVideos: IVideoItem[] = [
    {
      id: '1',
      video: './video/video-01.mp4',
      href: '/stream',
      name: 'Смотрим кофе',
      users: '1.2K viewers',
      type: 'Игры',
      isLive: true,
    },
    {
      id: '2',
      video: './video/video-02.mp4',
      href: '/stream',
      name: 'Смотрим кофе 2',
      users: '850 viewers',
      type: 'Игры',
      isLive: true,
    },
    {
      id: '3',
      video: './video/video-03.mp4',
      href: '/stream',
      name: 'Cooking Show Host',
      users: '600 viewers',
      type: 'Игры',
      isLive: true,
    },
    {
      id: '4',
      video: './video/video-01.mp4',
      href: '/stream',
      name: 'Indie Game Developer',
      users: '450 viewers',
      type: 'Киберспорт',
      isLive: true,
    },
    {
      id: '5',
      video: './video/video-02.mp4',
      href: '/stream',
      name: 'Travel Vlogger',
      users: '300 viewers',
      type: 'Киберспорт',
      isLive: true,
    },
    {
      id: '6',
      video: './video/video-03.mp4',
      href: '/stream',
      name: 'Fitness Instructor',
      users: '200 viewers',
      type: 'Киберспорт',
      isLive: true,
    },
  ];

  const testUsers: IUser[] = [
    { id: 'u1', name: 'Olivia Jordan', avatar: './img/users/user-01.jpg', live: true },
    { id: 'u2', name: 'Grace Phillips', avatar: './img/users/user-02.jpg', live: true },
    { id: 'u3', name: 'Ewan Watson', avatar: './img/users/user-03.jpg', live: false },
    { id: 'u4', name: 'Ethan Anderson', avatar: './img/banner-user/banner-01.png', live: true },
    { id: 'u5', name: 'Mia Kim', avatar: './img/banner-user/banner-02.png', live: false },
    { id: 'u6', name: 'Noah Campbell', avatar: './img//preview/preview-01.jpg', live: true },
    { id: 'u7', name: 'Olivia Jordan', avatar: './img/users/user-01.jpg', live: true },
    { id: 'u8', name: 'Grace Phillips', avatar: './img/users/user-02.jpg', live: true },
    { id: 'u9', name: 'Ewan Watson', avatar: './img/users/user-03.jpg', live: false },
    { id: 'u10', name: 'Ethan Anderson', avatar: './img/banner-user/banner-01.png', live: true },
    { id: 'u11', name: 'Mia Kim', avatar: './img/banner-user/banner-02.png', live: false },
    { id: 'u12', name: 'Noah Campbell', avatar: './img//preview/preview-01.jpg', live: true },
  ];

  const TabsComponents = [
    <SectionListVideo list={testVideos} />,
    <SectionListVideo list={testVideos} />,
    <SectionListVideo list={testVideos} />,
    <CatalogUsers list={testUsers} />,
  ];

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }} className="page">
        <ContainerBox>
          <TabsComponent propsChild={TabsComponents} propTabsTitle={['Live', 'Видео', 'Клипы', 'Пользователи']} />
        </ContainerBox>
      </Box>
    </>
  );
});

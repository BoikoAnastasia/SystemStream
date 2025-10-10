import { FC, JSX } from 'react';
import { appLayout } from '../../layout/index';
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';

export const MainPage: FC = appLayout((): JSX.Element => {
  const testVideos = [
    { id: '1', video: './video/video-01.mp4', href: '/stream', name: 'Gaming Streamer', users: '1.2K viewers' },
    { id: '2', video: './video/video-02.mp4', href: '/stream', name: 'Tech Reviewer', users: '850 viewers' },
    { id: '3', video: './video/video-03.mp4', href: '/stream', name: 'Cooking Show Host', users: '600 viewers' },
    { id: '4', video: './video/video-01.mp4', href: '/stream', name: 'Indie Game Developer', users: '450 viewers' },
    { id: '5', video: './video/video-02.mp4', href: '/stream', name: 'Travel Vlogger', users: '300 viewers' },
    { id: '6', video: './video/video-03.mp4', href: '/stream', name: 'Fitness Instructor', users: '200 viewers' },
  ];

  const testImages = [
    { id: '1', img: './img/users/user-01.jpg', href: '/user', name: 'Gaming Streamer', users: '200 followers' },
    { id: '2', img: './img/users/user-02.jpg', href: '/user', name: 'Tech Reviewer', users: '850 followers' },
    { id: '3', img: './img/users/user-03.jpg', href: '/user', name: 'Cooking Show Host', users: '600 followers' },
    { id: '4', img: './img/users/user-01.jpg', href: '/user', name: 'Indie Game Developer', users: '450 followers' },
    { id: '5', img: './img/users/user-02.jpg', href: '/user', name: 'Travel Vlogger', users: '300 followers' },
    { id: '6', img: './img/users/user-03.jpg', href: '/user', name: 'Fitness Instructor', users: '200 followers' },
  ];

  const arrAllCategory = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <SectionListVideo title="Live каналы" list={testVideos} />
        <SectionListVideo title="Видео" list={testVideos} />
        <SectionListVideo title="Клипы" list={testVideos} />
        <SectionListVideo title="Пользователи" list={testImages} isVideo={false} />
      </div>
    );
  };

  const TabsComponents = [
    arrAllCategory,
    <SectionListVideo title="Live каналы" list={testVideos} />,
    <SectionListVideo title="Видео" list={testVideos} />,
    <SectionListVideo title="Клипы" list={testVideos} />,
    <SectionListVideo title="Пользователи" list={testImages} isVideo={false} />,
  ];

  return (
    <div className="page container__main">
      <TabsComponent
        propsChild={TabsComponents}
        propTabsTitle={['Все', 'Live каналы', 'Видео', 'Клипы', 'Пользователи']}
      />
    </div>
  );
});

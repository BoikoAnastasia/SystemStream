import { FC, JSX } from 'react';
import { appLayout } from '../../layout/index';
// components
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { ContainerBox } from '../../components/StylesComponents';
import { UserAbout } from './components/userAbout/UserAbout';
// mui
import { UserSchedule } from './components/userSchedule/UserSchedule';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { IVideoItem } from '../../types/share';

const testVideos: IVideoItem[] = [
  {
    id: '1',
    video: './video/video-01.mp4',
    href: '/stream',
    name: 'Смотрим кофе',
    users: '1.2K viewers',
    type: 'Игры',
    isLive: false,
  },
  {
    id: '2',
    video: './video/video-02.mp4',
    href: '/stream',
    name: 'Смотрим кофе 2',
    users: '850 viewers',
    type: 'Игры',
    isLive: false,
  },
  {
    id: '3',
    video: './video/video-03.mp4',
    href: '/stream',
    name: 'Cooking Show Host',
    users: '600 viewers',
    type: 'Игры',
    isLive: false,
  },
  {
    id: '4',
    video: './video/video-01.mp4',
    href: '/stream',
    name: 'Indie Game Developer',
    users: '450 viewers',
    type: 'Киберспорт',
    isLive: false,
  },
  {
    id: '5',
    video: './video/video-02.mp4',
    href: '/stream',
    name: 'Travel Vlogger',
    users: '300 viewers',
    type: 'Киберспорт',
    isLive: false,
  },
  {
    id: '6',
    video: './video/video-03.mp4',
    href: '/stream',
    name: 'Fitness Instructor',
    users: '200 viewers',
    type: 'Киберспорт',
    isLive: false,
  },
];

export const UserPage: FC = appLayout((): JSX.Element => {
  return (
    <ContainerBox>
      <TabsComponent
        propsChild={[<UserAbout />, <UserSchedule />, <SectionListVideo list={testVideos} />]}
        propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
      />
    </ContainerBox>
  );
});

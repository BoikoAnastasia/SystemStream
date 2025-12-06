import { FC, JSX, useEffect } from 'react';
// layout
import { appLayout } from '../../layout/index';
// redux
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { AppDispatch } from '../../store/store';
import { fetchUserOnlineStreams } from '../../store/actions/StreamsActions';
// components
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox } from '../../components/StylesComponents';
import { CatalogUsers } from '../../components/catalogUsers/CatalogUsers';
import { PaginationComponent } from '../../components/ui/pagination/PaginationComponent';
// mui
import { Box } from '@mui/material';
// types
import { IStreamOnline, IUser } from '../../types/share';
import { ContentWrapperSwitch } from '../../components/сontentWrapperSwitch/ContentWrapperSwitch';

export const testStreams: IStreamOnline[] = [
  {
    nickname: 'Gamer01',
    profileImage: './img/users/user-01.jpg',
    isOnline: true,
    streamersLeague: 'Игры',
    previewUrl: './img/preview/preview-01.jpg',
    streamName: 'Epic Battle Stream',
    streamId: 1,
  },
  {
    nickname: 'Chef02',
    profileImage: './img/users/user-02.jpg',
    isOnline: true,
    streamersLeague: 'Cooking',
    previewUrl: './img/preview/preview-02.jpg',
    streamName: 'Cooking Show Live',
    streamId: 2,
  },
  {
    nickname: 'Travel03',
    profileImage: './img/users/user-03.jpg',
    isOnline: false,
    streamersLeague: 'Путешествия',
    previewUrl: './img/preview/preview-03.jpg',
    streamName: 'Exploring Japan',
    streamId: 3,
  },
  {
    nickname: 'Fitness04',
    profileImage: './img/users/user-04.jpg',
    isOnline: true,
    streamersLeague: 'Фитнес',
    previewUrl: './img/preview/preview-04.jpg',
    streamName: 'Morning Workout',
    streamId: 4,
  },
  {
    nickname: 'Indie05',
    profileImage: './img/users/user-05.jpg',
    isOnline: false,
    streamersLeague: 'Киберспорт',
    previewUrl: './img/preview/preview-05.jpg',
    streamName: 'Indie Game Dev Live',
    streamId: 5,
  },
  {
    nickname: 'Music06',
    profileImage: './img/users/user-06.jpg',
    isOnline: true,
    streamersLeague: 'Музыка',
    previewUrl: './img/preview/preview-06.jpg',
    streamName: 'Live Concert Session',
    streamId: 6,
  },
  {
    nickname: 'Gamer07',
    profileImage: './img/users/user-07.jpg',
    isOnline: true,
    streamersLeague: 'Игры',
    previewUrl: './img/preview/preview-07.jpg',
    streamName: 'Speedrun Madness',
    streamId: 7,
  },
  {
    nickname: 'Chef08',
    profileImage: './img/users/user-08.jpg',
    isOnline: false,
    streamersLeague: 'Cooking',
    previewUrl: './img/preview/preview-08.jpg',
    streamName: 'Baking Live',
    streamId: 8,
  },
  {
    nickname: 'Travel09',
    profileImage: './img/users/user-09.jpg',
    isOnline: true,
    streamersLeague: 'Путешествия',
    previewUrl: './img/preview/preview-09.jpg',
    streamName: 'Hiking Adventure',
    streamId: 9,
  },
  {
    nickname: 'Fitness10',
    profileImage: './img/users/user-10.jpg',
    isOnline: true,
    streamersLeague: 'Фитнес',
    previewUrl: './img/preview/preview-10.jpg',
    streamName: 'Evening Yoga',
    streamId: 10,
  },
  {
    nickname: 'Indie11',
    profileImage: './img/users/user-11.jpg',
    isOnline: false,
    streamersLeague: 'Киберспорт',
    previewUrl: './img/preview/preview-11.jpg',
    streamName: 'Indie Challenge',
    streamId: 11,
  },
  {
    nickname: 'Music12',
    profileImage: './img/users/user-12.jpg',
    isOnline: true,
    streamersLeague: 'Музыка',
    previewUrl: './img/preview/preview-12.jpg',
    streamName: 'Piano Live',
    streamId: 12,
  },
  {
    nickname: 'Gamer13',
    profileImage: './img/users/user-01.jpg',
    isOnline: false,
    streamersLeague: 'Игры',
    previewUrl: './img/preview/preview-01.jpg',
    streamName: 'Multiplayer Madness',
    streamId: 13,
  },
  {
    nickname: 'Chef14',
    profileImage: './img/users/user-02.jpg',
    isOnline: true,
    streamersLeague: 'Cooking',
    previewUrl: './img/preview/preview-02.jpg',
    streamName: 'Sushi Live',
    streamId: 14,
  },
  {
    nickname: 'Travel15',
    profileImage: './img/users/user-03.jpg',
    isOnline: true,
    streamersLeague: 'Путешествия',
    previewUrl: './img/preview/preview-03.jpg',
    streamName: 'City Tour',
    streamId: 15,
  },
  {
    nickname: 'Fitness16',
    profileImage: './img/users/user-04.jpg',
    isOnline: false,
    streamersLeague: 'Фитнес',
    previewUrl: './img/preview/preview-04.jpg',
    streamName: 'Cardio Blast',
    streamId: 16,
  },
  {
    nickname: 'Indie17',
    profileImage: './img/users/user-05.jpg',
    isOnline: true,
    streamersLeague: 'Киберспорт',
    previewUrl: './img/preview/preview-05.jpg',
    streamName: 'Retro Games',
    streamId: 17,
  },
  {
    nickname: 'Music18',
    profileImage: './img/users/user-06.jpg',
    isOnline: false,
    streamersLeague: 'Музыка',
    previewUrl: './img/preview/preview-06.jpg',
    streamName: 'Guitar Live',
    streamId: 18,
  },
  {
    nickname: 'Gamer19',
    profileImage: './img/users/user-07.jpg',
    isOnline: true,
    streamersLeague: 'Игры',
    previewUrl: './img/preview/preview-07.jpg',
    streamName: 'FPS Action',
    streamId: 19,
  },
  {
    nickname: 'Chef20',
    profileImage: './img/users/user-08.jpg',
    isOnline: true,
    streamersLeague: 'Cooking',
    previewUrl: './img/preview/preview-08.jpg',
    streamName: 'Dessert Live',
    streamId: 20,
  },
  {
    nickname: 'Travel21',
    profileImage: './img/users/user-09.jpg',
    isOnline: false,
    streamersLeague: 'Путешествия',
    previewUrl: './img/preview/preview-09.jpg',
    streamName: 'Beach Vlog',
    streamId: 21,
  },
  {
    nickname: 'Fitness22',
    profileImage: './img/users/user-10.jpg',
    isOnline: true,
    streamersLeague: 'Фитнес',
    previewUrl: './img/preview/preview-10.jpg',
    streamName: 'Strength Training',
    streamId: 22,
  },
  {
    nickname: 'Indie23',
    profileImage: './img/users/user-11.jpg',
    isOnline: true,
    streamersLeague: 'Киберспорт',
    previewUrl: './img/preview/preview-11.jpg',
    streamName: 'Strategy Games',
    streamId: 23,
  },
  {
    nickname: 'Music24',
    profileImage: './img/users/user-12.jpg',
    isOnline: false,
    streamersLeague: 'Музыка',
    previewUrl: './img/preview/preview-12.jpg',
    streamName: 'Violin Live',
    streamId: 24,
  },
  {
    nickname: 'Gamer25',
    profileImage: './img/users/user-01.jpg',
    isOnline: true,
    streamersLeague: 'Игры',
    previewUrl: './img/preview/preview-01.jpg',
    streamName: 'Battle Royale',
    streamId: 25,
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

export const MainPage: FC = appLayout((): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError } = useAppSelector((state) => state.streams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const streams = data?.streams ?? [];
  const { page = 1, pageSize = 25, totalStreams = 0 } = data ?? {};
  const pageCount = Math.ceil(totalStreams / pageSize);

  useEffect(() => {
    if (!data && !isLoading) {
      dispatch(fetchUserOnlineStreams());
    }
  }, [dispatch, data, isLoading]);

  const getTabsComponents = () => [
    <ContentWrapperSwitch
      isLoading={isLoading}
      isError={isError}
      data={streams}
      text={'Пока нет Live стримов'}
      onRetry={fetchUserOnlineStreams}
    >
      <SectionListVideo list={streams} key="live" />,
    </ContentWrapperSwitch>,
    <SectionListVideo list={testStreams} key="videos" />,
    <SectionListVideo list={testStreams} key="videos" />,
    <CatalogUsers list={testUsers} key="users" />,
  ];

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }} className="page">
        <ContainerBox>
          <TabsComponent propsChild={getTabsComponents()} propTabsTitle={['Live', 'Видео', 'Клипы', 'Пользователи']} />
          {streams.length > 0 && (
            <PaginationComponent
              isSmall={false}
              count={page}
              pageCurrent={pageCount}
              functionDispatch={fetchUserOnlineStreams}
            />
          )}
        </ContainerBox>
      </Box>
    </>
  );
});

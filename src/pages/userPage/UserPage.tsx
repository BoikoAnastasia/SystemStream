import { FC, JSX, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';
import { appLayout } from '../../layout/index';
// redux
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
// components
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { UserAbout } from './components/userAbout/UserAbout';
import { UserSchedule } from './components/userSchedule/UserSchedule';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox } from '../../components/StylesComponents';
import { UserBanner } from './components/userBanner/UserBanner';
import { StreamPage } from '../streamPage/StreamPage';
// store
import { AppDispatch } from '../../store/store';
import { fetchUserByNickname } from '../../store/actions/UserActions';
import { SelectUserSlice } from '../../store/slices/SelectUserSlice';
// hooks, context
import { useStreamHub } from '../../hooks/useStreamHub';
import { useNickname } from '../../context/NicknameContext';
// share
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
  const { nickname: paramNickname } = useParams<{ nickname: string }>();
  const { nickname, setNickname } = useNickname();
  const { currentStream, joinStream, leaveStream } = useStreamHub(nickname || undefined);
  const { Clear } = SelectUserSlice.actions;

  const dispatch = useDispatch<AppDispatch>();
  const { data: profile } = useAppSelector((state) => state.user);
  const { data: selectedUser } = useAppSelector((state) => state.selectUser);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (paramNickname) setNickname(paramNickname);
  }, [paramNickname, setNickname]);

  useEffect(() => {
    if (!paramNickname) return;
    if (profile && profile.nickname === paramNickname) {
      dispatch(Clear());
      return;
    }
    dispatch(fetchUserByNickname(paramNickname));
  }, [paramNickname, profile, dispatch, Clear]);

  useEffect(() => {
    if (!paramNickname) return;
    joinStream();

    return () => {
      leaveStream();
    };
  }, [paramNickname, joinStream, leaveStream]);

  useEffect(() => {
    if (!currentStream) {
      if (videoRef.current) videoRef.current.src = '';
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(currentStream.hlsUrl);
      hls.attachMedia(videoRef.current!);
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current?.play());
    } else {
      videoRef.current!.src = currentStream.hlsUrl;
      videoRef.current!.play();
    }
  }, [currentStream]);

  const userData = profile?.nickname === paramNickname ? profile : selectedUser;
  const showBtnSubsribe = profile?.nickname !== paramNickname;

  return (
    <ContainerBox>
      {currentStream?.isLive && <StreamPage videoRef={videoRef} streamInfo={currentStream} />}
      <UserBanner userData={userData} showBtnSubsribe={showBtnSubsribe} />
      <TabsComponent
        propsChild={[<UserAbout userData={userData} />, <UserSchedule />, <SectionListVideo list={testVideos} />]}
        propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
      />
    </ContainerBox>
  );
});

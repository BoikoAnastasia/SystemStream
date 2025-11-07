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
import { StreamPage } from '../streamPage/StreamPage';
import { UserBanner } from './components/userBanner/UserBanner';
// store
import { AppDispatch } from '../../store/store';
import { fetchUserByNickname, userProfile } from '../../store/actions/UserActions';
import { fetchStreamKey, fetchStreamView } from '../../store/actions/StreamActions';
// share
import { IVideoItem } from '../../types/share';
import { Loader } from '../../components/ui/loader/Loader';

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
  const { nickname } = useParams<{ nickname: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: profile } = useAppSelector((state) => state.user);
  const { data: selectedUser } = useAppSelector((state) => state.selectUser);
  const { data: stream, isLoading } = useAppSelector((state) => state.stream);
  const { data: setting } = useAppSelector((state) => state.settings);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamStartedRef = useRef(false);

  const startStream = (hlsUrl: string) => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = hlsUrl;
        videoRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (!nickname) return;
    if (profile?.nickname === nickname) {
      if (!profile) dispatch(userProfile());
      return;
    }
    dispatch(fetchUserByNickname(nickname));
  }, [nickname, dispatch, profile]);

  useEffect(() => {
    if (!stream) return;

    if (stream.isLive && !streamStartedRef.current) {
      startStream(stream.hlsUrl);
      streamStartedRef.current = true;
    } else if (!stream.isLive && streamStartedRef.current) {
      const timeout = setTimeout(() => {
        if (!stream.isLive) {
          streamStartedRef.current = false;
          if (videoRef.current) videoRef.current.src = '';
        }
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [stream]);

  useEffect(() => {
    if (!nickname) return;
    if (!setting) dispatch(fetchStreamKey());
  }, [dispatch, nickname, setting]);

  useEffect(() => {
    if (!nickname) return;
    dispatch(fetchStreamView(nickname));

    const interval = setInterval(() => {
      dispatch(fetchStreamView(nickname));
    }, 5000);

    return () => clearInterval(interval);
  }, [nickname, dispatch]);

  const userData = profile?.nickname === nickname ? profile : selectedUser;
  return (
    <ContainerBox>
      {stream?.isLive && <StreamPage videoRef={videoRef} streamInfo={stream} />}
      <UserBanner userData={userData} />
      <TabsComponent
        propsChild={[<UserAbout userData={userData} />, <UserSchedule />, <SectionListVideo list={testVideos} />]}
        propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
      />
    </ContainerBox>
  );
});

import { FC, JSX, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';
import { appLayout } from '../../layout/index';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { UserAbout } from './components/userAbout/UserAbout';
import { UserSchedule } from './components/userSchedule/UserSchedule';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox } from '../../components/StylesComponents';
import { UserBanner } from './components/userBanner/UserBanner';
import { StreamPage } from '../streamPage/StreamPage';
import { AppDispatch } from '../../store/store';
import { fetchUserByNickname } from '../../store/actions/UserActions';
import { SelectUserSlice } from '../../store/slices/SelectUserSlice';
import { useStreamHub } from '../../hooks/useStreamHub';
import { useNickname } from '../../context/NicknameContext';
import { IVideoItem } from '../../types/share';

const testVideos: IVideoItem[] = [
  /* твои видео */
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
  const hlsRef = useRef<Hls | null>(null);

  // Устанавливаем nickname в контекст
  useEffect(() => {
    if (paramNickname) setNickname(paramNickname);
  }, [paramNickname, setNickname]);

  // Загружаем профиль пользователя
  useEffect(() => {
    if (!paramNickname) return;
    if (profile && profile.nickname === paramNickname) {
      dispatch(Clear());
      return;
    }
    dispatch(fetchUserByNickname(paramNickname));
  }, [paramNickname, profile, dispatch, Clear]);

  // Подключаемся к стриму один раз, только если стрим live
  useEffect(() => {
    if (!paramNickname || !currentStream?.isLive) return;

    joinStream(); // только если стрим live

    return () => {
      leaveStream();
    };
  }, [paramNickname, currentStream?.isLive, joinStream, leaveStream]);

  // Воспроизведение HLS без мерцания
  useEffect(() => {
    if (!currentStream?.hlsUrl || !videoRef.current) return;

    // Если Hls уже создан и тот же URL — не пересоздаём
    if (hlsRef.current && hlsRef.current.url === currentStream.hlsUrl) return;

    // Очистка старого Hls
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(currentStream.hlsUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current?.play());
      hlsRef.current = hls;
    } else {
      videoRef.current.src = currentStream.hlsUrl;
      videoRef.current.play();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentStream?.hlsUrl]);

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

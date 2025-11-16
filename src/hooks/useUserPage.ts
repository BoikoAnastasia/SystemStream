import { useEffect, useRef } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { useAppSelector } from './redux';
// store
import { AppDispatch } from '../store/store';
import { SelectUserSlice } from '../store/slices/SelectUserSlice';
import { fetchUserByNickname } from '../store/actions/UserActions';
// hls
import Hls from 'hls.js';
// context
import { useNickname } from '../context/NicknameContext';
// hooks
import { useStreamHub } from './useStreamHub';

export const useUserPage = (paramNickname: string | undefined) => {
  const { nickname, setNickname } = useNickname();
  const { currentStream, joinStream, leaveStream } = useStreamHub(nickname || undefined);

  const dispatch = useDispatch<AppDispatch>();
  const { data: profile } = useAppSelector((state) => state.user);
  const { data: selectedUser, isLoading, isError } = useAppSelector((state) => state.selectUser);
  const { Clear } = SelectUserSlice.actions;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

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
  const isNotProfileData = profile?.nickname !== paramNickname;

  return { userData, currentStream, videoRef, isLoading, isError, isNotProfileData };
};

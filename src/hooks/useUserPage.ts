import { useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { useAppSelector } from './redux';
import { fetchUserByNickname } from '../store/actions/UserActions';
import { SelectUserSlice } from '../store/slices/SelectUserSlice';
import { AppDispatch } from '../store/store';
import { useNickname } from '../context/NicknameContext';
import { useStreamHub } from './useStreamHub';

export const useUserPage = (paramNickname?: string) => {
  const { nickname, setNickname } = useNickname();
  const dispatch = useDispatch<AppDispatch>();
  const { data: profile } = useAppSelector((state) => state.user);
  const { data: selectedUser, isLoading, isError } = useAppSelector((state) => state.selectUser);
  const { Clear } = SelectUserSlice.actions;

  // Устанавливаем ник
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

  // SignalR + HLS
  const { videoRef, currentStream, viewerCount } = useStreamHub({
    nickname: nickname || paramNickname,
  });

  // Данные пользователя
  const userData = profile?.nickname === paramNickname ? profile : selectedUser;
  const isNotProfileData = profile?.nickname !== paramNickname;

  return { userData, isNotProfileData, videoRef, currentStream, viewerCount, isLoading, isError };
};

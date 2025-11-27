import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// pages
import { appLayout } from '../../layout';
import { StreamPage } from '../streamPage/StreamPage';
// components
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { UserAbout } from './components/userAbout/UserAbout';
import { UserSchedule } from './components/userSchedule/UserSchedule';
import { ContainerBox, StyledBannerUserInfo } from '../../components/StylesComponents';
import { UserBanner } from './components/userBanner/UserBanner';
import { Loader } from '../../components/ui/loader/Loader';
// hooks
import { useUserPage } from '../../hooks/useUserPage';
import { UserStreams } from './components/userStreams/UserStreams';
import { useAppSelector } from '../../hooks/redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fecthStreamHistory } from '../../store/actions/StreamsActions';

// TODO history
export const UserPage: FC = appLayout(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { nickname: paramNickname } = useParams<{ nickname: string }>();
  const { userData, isNotProfileData, videoRef, currentStream, viewerCount, isLoading, isError } =
    useUserPage(paramNickname);
  const { data, isLoading: loadHistory, lastNickname } = useAppSelector((state) => state.userStreams);

  useEffect(() => {
    if (paramNickname && paramNickname !== lastNickname) {
      dispatch(fecthStreamHistory(paramNickname));
    }
    if (data?.streams.length === 0) dispatch(fecthStreamHistory(paramNickname));
  }, [data?.streams.length, dispatch, lastNickname, paramNickname]);

  if (isLoading) return <Loader />;

  if (isError === 'NOT_FOUND') {
    return (
      <ContainerBox>
        <StyledBannerUserInfo sx={{ textAlign: 'center' }}>Такого пользователя не существует</StyledBannerUserInfo>
      </ContainerBox>
    );
  }

  return (
    <ContainerBox>
      {currentStream?.isLive && currentStream.hlsUrl && (
        <StreamPage videoRef={videoRef} streamInfo={currentStream} viewerCount={viewerCount} />
      )}
      <UserBanner userData={userData} isNotProfileData={isNotProfileData} />
      <TabsComponent
        propsChild={[<UserAbout userData={userData} />, <UserSchedule />, <UserStreams dataStreams={data} />]}
        propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
      />
    </ContainerBox>
  );
});

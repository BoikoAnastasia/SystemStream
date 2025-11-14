import { FC, JSX } from 'react';
import { useParams } from 'react-router-dom';
// components
import { appLayout } from '../../layout/index';
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { UserAbout } from './components/userAbout/UserAbout';
import { UserSchedule } from './components/userSchedule/UserSchedule';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox, StyledBannerUserInfo } from '../../components/StylesComponents';
import { UserBanner } from './components/userBanner/UserBanner';
import { StreamPage } from '../streamPage/StreamPage';
import { Loader } from '../../components/ui/loader/Loader';
// hooks
import { IVideoItem } from '../../types/share';
// types
import { useUserPage } from '../../hooks/useUserPage';

const testVideos: IVideoItem[] = [];

export const UserPage: FC = appLayout((): JSX.Element => {
  const { nickname: paramNickname } = useParams<{ nickname: string }>();
  const { userData, currentStream, videoRef, isLoading, isError, showBtnSubscribe } = useUserPage(paramNickname);

  if (isLoading) {
    return <Loader />;
  }

  if (isError === 'NOT_FOUND') {
    return (
      <ContainerBox>
        <StyledBannerUserInfo sx={{ textAlign: 'center' }}>Такого пользователя не существует</StyledBannerUserInfo>
      </ContainerBox>
    );
  }

  return (
    <ContainerBox>
      {currentStream?.isLive && <StreamPage videoRef={videoRef} streamInfo={currentStream} />}
      <UserBanner userData={userData} showBtnSubsribe={showBtnSubscribe} />
      <TabsComponent
        propsChild={[<UserAbout userData={userData} />, <UserSchedule />, <SectionListVideo list={testVideos} />]}
        propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
      />
    </ContainerBox>
  );
});

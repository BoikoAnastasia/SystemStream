import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { appLayout } from '../../layout';
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { UserAbout } from './components/userAbout/UserAbout';
import { UserSchedule } from './components/userSchedule/UserSchedule';
import { SectionListVideo } from '../../components/sectionListVideo/SectionListVideo';
import { ContainerBox, StyledBannerUserInfo } from '../../components/StylesComponents';
import { UserBanner } from './components/userBanner/UserBanner';
import { Loader } from '../../components/ui/loader/Loader';
import { useUserPage } from '../../hooks/useUserPage';
import { StreamPage } from '../streamPage/StreamPage';

const testVideos: any = [];

export const UserPage: FC = appLayout(() => {
  const { nickname: paramNickname } = useParams<{ nickname: string }>();
  const { userData, isNotProfileData, videoRef, currentStream, viewerCount, isLoading, isError } =
    useUserPage(paramNickname);

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
      {currentStream?.isLive && <StreamPage videoRef={videoRef} streamInfo={currentStream} viewerCount={viewerCount} />}
      <UserBanner userData={userData} isNotProfileData={isNotProfileData} />
      <TabsComponent
        propsChild={[<UserAbout userData={userData} />, <UserSchedule />, <SectionListVideo list={testVideos} />]}
        propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
      />
    </ContainerBox>
  );
});

import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../../store/store';
import { fecthStreamHistory } from '../../store/actions/StreamsActions';
// pages
import { appLayout } from '../../layout';
import { StreamPage } from '../streamPage/StreamPage';
// components
import { TabsComponent } from '../../components/ui/tabs/TabsComponent';
import { UserAbout } from './components/userAbout/UserAbout';
import { UserSchedule } from './components/userSchedule/UserSchedule';
import { ContainerBox } from '../../components/StylesComponents';
import { UserBanner } from './components/userBanner/UserBanner';
import { UserStreams } from './components/userStreams/UserStreams';
import { ContentWrapperSwitch } from '../../components/сontentWrapperSwitch/ContentWrapperSwitch';
// hooks
import { useUserPage } from '../../hooks/useUserPage';
import { useAppSelector } from '../../hooks/redux';

export const UserPage: FC = appLayout(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { nickname: paramNickname } = useParams<{ nickname: string }>();
  const {
    userData,
    isNotProfileData,
    videoRef,
    currentStream,
    viewerCount,
    isLoading,
    isError,
    messages,
    sendMessage,
  } = useUserPage(paramNickname);
  const {
    data: userHistoryStream,
    isLoading: loadHistory,
    lastNickname,
    isError: historyError,
  } = useAppSelector((state) => state.userStreams);

  useEffect(() => {
    if (paramNickname && paramNickname !== lastNickname) {
      dispatch(fecthStreamHistory(paramNickname));
    }
    if (userHistoryStream?.streams.length === 0) dispatch(fecthStreamHistory(paramNickname));
  }, [userHistoryStream?.streams.length, dispatch, lastNickname, paramNickname]);

  const getTabsComponents = () => [
    <UserAbout userData={userData} />,
    <UserSchedule />,
    <ContentWrapperSwitch
      isLoading={loadHistory}
      isError={historyError}
      data={userHistoryStream?.streams ?? []}
      onRetry={() => fecthStreamHistory(paramNickname)}
      text={'Стримы не найдены'}
    >
      {userHistoryStream && <UserStreams dataStreams={userHistoryStream} />}
    </ContentWrapperSwitch>,
  ];

  return (
    <ContainerBox>
      <ContentWrapperSwitch
        isLoading={isLoading}
        isError={isError}
        data={userData ? [userData] : []}
        onRetry={() => {}}
        text={'Такого пользователя не существует'}
      >
        {currentStream?.isLive && currentStream.hlsUrl && (
          <StreamPage
            videoRef={videoRef}
            streamInfo={currentStream}
            viewerCount={viewerCount}
            messages={messages}
            sendMessage={sendMessage}
          />
        )}
        <UserBanner userData={userData} isNotProfileData={isNotProfileData} />
        <TabsComponent
          propsChild={getTabsComponents()}
          propTabsTitle={['Основная информация', 'Расписание стримов', 'Все стримы']}
        />
      </ContentWrapperSwitch>
    </ContainerBox>
  );
});

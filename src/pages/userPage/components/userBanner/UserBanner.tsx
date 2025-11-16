import { useEffect, useState } from 'react';
// context
import { useHeaderModal } from '../../../../context/HeaderModalContext';
// components
import { Socials } from '../../../../components/socials/Socials';
import { BannerEffect } from '../../../../components/ui/bannerEffect/BannerEffect';
// store
import {
  deleteSubscribe,
  fetchtSubsribtionsById,
  streamerFolows,
  subscribeToUser,
} from '../../../../store/actions/SubscribersActions';
// hooks
import { useAppSelector } from '../../../../hooks/redux';
// styles
import {
  StyledBannerAvatar,
  StyledBannerUserInfo,
  StyledBannerUserName,
  StyledFollowButton,
  StyledInfo,
  StyledProfileSection,
} from '../../../../components/StylesComponents';

export const UserBanner = ({ userData, isNotProfileData }: any) => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { setOpen } = useHeaderModal();
  const { data } = useAppSelector((state) => state.user);

  const [subscribers, setSubscribers] = useState([]);
  const [isSubscriber, setIsSubscriber] = useState(false);

  const getSubsribers = async () => {
    return isNotProfileData ? await streamerFolows(userData.id) : await fetchtSubsribtionsById(userData.id);
  };

  const fecthDataSubsribers = async () => {
    const dataSubsribers = await getSubsribers();
    setSubscribers(dataSubsribers);
  };
  const isUserAlreadySubsribers = () => {
    if (!data || !subscribers) return;
    const subsribed = subscribers.some((user: any) => user.id === data?.id);
    setIsSubscriber(subsribed);
  };

  useEffect(() => {
    isUserAlreadySubsribers();
  }, [subscribers]);

  useEffect(() => {
    if (!userData) return;
    fecthDataSubsribers();
  }, [userData]);

  const handlerSubscribe = async () => {
    if (!userData) return;
    if (!isAuth) {
      setOpen(true);
      return;
    }

    const result = await subscribeToUser(userData.id);
    if (result) {
      fecthDataSubsribers();
    }
  };

  const handlerDeleteSubscribe = async () => {
    if (!userData) return;
    const result = await deleteSubscribe(userData.id);
    if (result) {
      fecthDataSubsribers();
    }
  };

  return (
    <StyledProfileSection
      sx={{
        backgroundImage: `url(${userData?.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <StyledInfo>
        <StyledBannerUserName>{userData?.nickname || 'Тестовое имя'}</StyledBannerUserName>
        <StyledBannerUserInfo>Streamer</StyledBannerUserInfo>
        <StyledBannerUserInfo>
          {subscribers && subscribers !== null ? subscribers.length : 0} подписчиков
        </StyledBannerUserInfo>
        {isNotProfileData &&
          (isSubscriber ? (
            <StyledFollowButton onClick={handlerDeleteSubscribe}>Отписаться</StyledFollowButton>
          ) : (
            <StyledFollowButton onClick={handlerSubscribe}>Подписаться</StyledFollowButton>
          ))}
      </StyledInfo>

      {!userData?.backgroundImage && <BannerEffect />}
      <StyledBannerAvatar src={`url(${userData?.profileImage})`} />
      <Socials />
    </StyledProfileSection>
  );
};

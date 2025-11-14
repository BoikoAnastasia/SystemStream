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
  isSubscribed,
  subscribeToUser,
} from '../../../../store/actions/UserActions';
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

export const UserBanner = ({ userData, showBtnSubsribe }: any) => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { setOpen } = useHeaderModal();

  const [subscribers, setSubscribers] = useState(0);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
    if (!userData) return;
    const fetchData = async () => {
      const subscriptions = await fetchtSubsribtionsById(userData.id);
      setSubscribers(subscriptions.length);
      const subscribed = await isSubscribed(userData.id);
      if (subscribed) setIsSubscriber(subscribed);
    };
    fetchData();
  }, [userData]);

  const handlerSubscribe = async () => {
    if (!userData) return;
    if (!isAuth) {
      setOpen(true);
      return;
    }

    const result = await subscribeToUser(userData.id);
    if (result) {
      const subscriptions = await fetchtSubsribtionsById(userData.id);
      setSubscribers(subscriptions.length);
      setIsSubscriber(true);
    }
  };

  const handlerDeleteSubscribe = async () => {
    if (!userData) return;
    const result = await deleteSubscribe(userData.id);
    if (result) {
      const subscriptions = await fetchtSubsribtionsById(userData.id);
      setSubscribers(subscriptions.length);
      setIsSubscriber(false);
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
        <StyledBannerUserInfo>{subscribers} подписчиков</StyledBannerUserInfo>
        {showBtnSubsribe &&
          (isSubscriber ? (
            <StyledFollowButton onClick={handlerDeleteSubscribe}>Отписаться</StyledFollowButton>
          ) : (
            <StyledFollowButton onClick={handlerSubscribe}>Подписаться</StyledFollowButton>
          ))}
      </StyledInfo>

      {!userData?.backgroundImage && <BannerEffect />}
      <StyledBannerAvatar src={`url(${userData?.profileImage}`} />
      <Socials />
    </StyledProfileSection>
  );
};

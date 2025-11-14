import { useEffect, useState } from 'react';
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
  const [subscribers, setSubscribers] = useState(0);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
    if (!userData) return;

    const fetchData = async () => {
      const subscriptions = await fetchtSubsribtionsById(userData.id);
      console.log(subscriptions);
      setSubscribers(subscriptions.length);

      const subscribed = await isSubscribed(userData.id);
      setIsSubscriber(subscribed);
    };

    fetchData();
  }, [userData]);

  const handlerSubscribe = async () => {
    if (!userData) return;
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

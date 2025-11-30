import { useEffect, useState } from 'react';
// context
import { useHeaderModal } from '../../../../context/HeaderModalContext';
// components
import { Socials } from '../../../../components/socials/Socials';
import { BannerEffect } from '../../../../components/ui/bannerEffect/BannerEffect';
// store
import { deleteSubscribe, streamerFolows, subscribeToUser } from '../../../../store/actions/SubscribersActions';
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
import { ISubscriber } from '../../../../types/share';

export const UserBanner = ({ userData, isNotProfileData }: any) => {
  const { isAuth, data: currentUser } = useAppSelector((state) => state.user);
  const { setOpen } = useHeaderModal();

  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [isSubscriber, setIsSubscriber] = useState(false);

  const fetchSubscribers = async () => {
    if (!userData) return;

    let result;
    result = await streamerFolows(userData.id);

    setSubscribers(Array.isArray(result) ? result : []);
  };

  // Проверяем, подписан ли текущий юзер
  const checkIsSubscribed = () => {
    if (!currentUser || !Array.isArray(subscribers)) return;
    setIsSubscriber(subscribers.some((u: any) => u.id === currentUser.id));
  };

  useEffect(() => {
    // console.log(`${process.env.REACT_APP_API_USER}${userData.profileImage}`);
    checkIsSubscribed();
  }, [subscribers]);

  useEffect(() => {
    fetchSubscribers();
  }, [userData]);

  const handlerSubscribe = async () => {
    if (!isAuth) {
      setOpen(true);
      return;
    }

    const result = await subscribeToUser(userData.id);
    if (result) fetchSubscribers();
  };

  const handlerDeleteSubscribe = async () => {
    const result = await deleteSubscribe(userData.id);
    if (result) fetchSubscribers();
  };

  return (
    <StyledProfileSection
      sx={{
        backgroundImage: userData?.backgroundImage && `${process.env.REACT_APP_API_USER}${userData?.backgroundImage}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <StyledInfo>
        <StyledBannerUserName>{userData?.nickname}</StyledBannerUserName>
        <StyledBannerUserInfo>Streamer</StyledBannerUserInfo>
        <StyledBannerUserInfo>{subscribers.length} подписчиков</StyledBannerUserInfo>

        {/* Показывать кнопку можно только на чужом профиле */}
        {isNotProfileData &&
          (isSubscriber ? (
            <StyledFollowButton onClick={handlerDeleteSubscribe}>Отписаться</StyledFollowButton>
          ) : (
            <StyledFollowButton onClick={handlerSubscribe}>Подписаться</StyledFollowButton>
          ))}
      </StyledInfo>

      {!userData?.backgroundImage && <BannerEffect />}
      <StyledBannerAvatar
        src={
          userData?.profileImage ? `${process.env.REACT_APP_API_USER}${userData?.profileImage}` : '/default-avatar.jpg'
        }
      />
      <Socials socials={currentUser?.socialLinks} />
    </StyledProfileSection>
  );
};

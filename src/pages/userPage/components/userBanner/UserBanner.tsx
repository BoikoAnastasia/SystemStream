import { useEffect, useState } from 'react';
// context

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
import { useHeaderModal } from '../../../../context/HeaderModalContext';

export const UserBanner = ({ userData, isNotProfileData }: any) => {
  const { isAuth, data: currentUser } = useAppSelector((state) => state.user);
  // const { setOpen } = useHeaderModal();

  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const { showAlert } = useHeaderModal();

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
    checkIsSubscribed();
  }, [subscribers]);

  useEffect(() => {
    fetchSubscribers();
  }, [userData]);

  const handlerSubscribe = async () => {
    if (!isAuth) {
      showAlert('Сначала войдите в профиль', 'warning');
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
        backgroundImage: `url(${process.env.REACT_APP_API_LOCAL}${userData?.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <StyledInfo>
        <StyledBannerUserName>{userData?.nickname}</StyledBannerUserName>
        <StyledBannerUserInfo>
          {subscribers.length
            ? subscribers.length === 1 && `${subscribers.length} подписчик`
            : `${subscribers.length} подписчиков`}
        </StyledBannerUserInfo>

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
          userData?.profileImage ? `${process.env.REACT_APP_API_LOCAL}${userData?.profileImage}` : '/default-avatar.jpg'
        }
      />
      <Socials socials={currentUser?.socialLinks} />
    </StyledProfileSection>
  );
};

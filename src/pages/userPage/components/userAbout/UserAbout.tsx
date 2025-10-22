import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { fetchUserByNickname, userProfile } from '../../../../store/reducers/ActionCreate';
// components
import { VideoCard } from '../../../../components/videoCard/VideoCard';
import { BannerEffect } from '../../../../components/ui/bannerEffect/BannerEffect';
import { Socials } from '../../../../components/socials/Socials';
// redux
import { useAppSelector } from '../../../../hooks/redux';
// styles
import {
  ContainerProfileComponents,
  StyledAboutSection,
  StyledBannerAvatar,
  StyledBannerUserInfo,
  StyledBannerUserName,
  StyledFollowButton,
  StyledInfo,
  StyledloadingCircle,
  StyledNameComponents,
  StyledProfileSection,
  StyledTitleModal,
  StyledVideoGrid,
  StyledVideoSection,
} from '../../../../components/StylesComponents';

export const UserAbout = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { data: profile } = useAppSelector((state) => state.user);
  const { data: selectedUser } = useAppSelector((state) => state.selectUser);

  useEffect(() => {
    if (!nickname) return;
    if (profile?.nickname === nickname) {
      if (!profile) dispatch(userProfile());
    } else {
      dispatch(fetchUserByNickname(nickname));
    }
  }, [nickname, dispatch, profile]);

  // if (!profile)
  //   return (
  //     <>
  //       <StyledloadingCircle></StyledloadingCircle>
  //     </>
  //   );

  const userData = profile?.nickname === nickname ? profile : selectedUser;

  return (
    <ContainerProfileComponents>
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
          <StyledBannerUserInfo>1.2M подписчиков</StyledBannerUserInfo>
          <StyledFollowButton>Подписаться</StyledFollowButton>
        </StyledInfo>
        {!userData?.backgroundImage && <BannerEffect />}
        <StyledBannerAvatar src={`url(${userData?.profileImage}`} />
        <Socials />
      </StyledProfileSection>

      <StyledAboutSection>
        <StyledTitleModal>ОБО МНЕ</StyledTitleModal>
        <StyledNameComponents sx={{ padding: '0 20px' }}>
          {userData?.profileDescription || 'Тестовое описание '}
        </StyledNameComponents>
      </StyledAboutSection>
      <StyledVideoSection>
        <StyledTitleModal>ПОСЛЕДНИЕ СТРИМЫ</StyledTitleModal>
        <StyledVideoGrid>
          {[1, 2, 3, 4, 5].map((i) => (
            <VideoCard key={i} index={i} />
          ))}
        </StyledVideoGrid>
      </StyledVideoSection>
    </ContainerProfileComponents>
  );
};

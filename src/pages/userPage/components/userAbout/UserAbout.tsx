import { useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { userProfile } from '../../../../store/reducers/ActionCreate';
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
  StyledNameComponents,
  StyledProfileSection,
  StyledTitleModal,
  StyledVideoGrid,
  StyledVideoSection,
} from '../../../../components/StylesComponents';

export const UserAbout = () => {
  const { data } = useAppSelector((state) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!data) dispatch(userProfile());
  }, [data, dispatch]);

  return (
    <ContainerProfileComponents>
      <StyledProfileSection
        sx={{
          backgroundImage: `url(${data?.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <StyledInfo>
          <StyledBannerUserName>{data?.nickname || 'Тестовое имя'}</StyledBannerUserName>
          <StyledBannerUserInfo>Streamer</StyledBannerUserInfo>
          <StyledBannerUserInfo>1.2M подписчиков</StyledBannerUserInfo>
          <StyledFollowButton>Подписаться</StyledFollowButton>
        </StyledInfo>
        {!data?.backgroundImage && <BannerEffect />}
        <StyledBannerAvatar src={`url(${data?.profileImage}`} />
        <Socials />
      </StyledProfileSection>

      <StyledAboutSection>
        <StyledTitleModal>ОБО МНЕ</StyledTitleModal>
        <StyledNameComponents sx={{ padding: '0 20px' }}>
          {data?.profileDescription || 'Тестовое описание '}
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

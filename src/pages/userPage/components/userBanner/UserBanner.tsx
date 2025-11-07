import {
  StyledBannerAvatar,
  StyledBannerUserInfo,
  StyledBannerUserName,
  StyledFollowButton,
  StyledInfo,
  StyledProfileSection,
} from '../../../../components/StylesComponents';
import { Socials } from '../../../../components/socials/Socials';
import { BannerEffect } from '../../../../components/ui/bannerEffect/BannerEffect';

export const UserBanner = ({ userData }: any) => {
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
        <StyledBannerUserInfo>1.2M подписчиков</StyledBannerUserInfo>
        <StyledFollowButton>Подписаться</StyledFollowButton>
      </StyledInfo>

      {!userData?.backgroundImage && <BannerEffect />}
      <StyledBannerAvatar src={`url(${userData?.profileImage}`} />
      <Socials />
    </StyledProfileSection>
  );
};

import { VideoCard } from '../../../../components/videoCard/VideoCard';
import { BannerEffect } from '../../../../components/ui/bannerEffect/BannerEffect';
// mui
import { Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
// styles
import {
  ContainerProfileComponents,
  StyledAboutSection,
  StyledBannerAvatar,
  StyledBannerUserInfo,
  StyledBannerUserName,
  StyledFollowButton,
  StyledIconButton,
  StyledInfo,
  StyledNameComponents,
  StyledProfileSection,
  StyledSocials,
  StyledTitleModal,
  StyledVideoGrid,
  StyledVideoSection,
} from '../../../../components/StylesComponents';

export const UserAbout = () => {
  return (
    <ContainerProfileComponents>
      <StyledProfileSection>
        <StyledInfo>
          <StyledBannerUserName>Ava Bennett</StyledBannerUserName>
          <StyledBannerUserInfo>Streamer</StyledBannerUserInfo>
          <StyledBannerUserInfo>1.2M followers</StyledBannerUserInfo>
          <StyledFollowButton>Подписаться</StyledFollowButton>
        </StyledInfo>
        <BannerEffect />
        <StyledBannerAvatar src="./img/banner-user/banner-02.png" />
      </StyledProfileSection>
      <StyledAboutSection>
        <StyledTitleModal>ОБО МНЕ</StyledTitleModal>
        <StyledNameComponents sx={{ padding: '0 20px' }}>
          Hi, I'm Ava Bennett, a full-time streamer from Los Angeles. I love playing RPGs and interacting with my
          community. Join my streams for fun, games, and good vibes!
        </StyledNameComponents>
        <StyledSocials>
          <StyledIconButton>
            <InstagramIcon />
            <Typography>@AvaBennett</Typography>
          </StyledIconButton>
          <StyledIconButton>
            <TwitterIcon />
            <Typography>@AnaBennett</Typography>
          </StyledIconButton>
        </StyledSocials>
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

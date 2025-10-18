// components
import { VideoCard } from '../../../../components/videoCard/VideoCard';
import { BannerEffect } from '../../../../components/ui/bannerEffect/BannerEffect';
// redux
import { useAppSelector } from '../../../../hooks/redux';
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
  const { data } = useAppSelector((state) => state.user);

  return (
    <ContainerProfileComponents>
      <StyledProfileSection>
        <StyledInfo>
          <StyledBannerUserName>{data?.nickname || 'Тестовое имя'}</StyledBannerUserName>
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
          {data?.profileDescription || 'Тестового описания нет'}
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

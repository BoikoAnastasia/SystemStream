// mui
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Typography } from '@mui/material';
// styles
import { StyledSocialButton, StyledSocials } from '../StylesComponents';
import { ISocialLink } from '../../types/share';

export const Socials = ({ socials }: { socials: ISocialLink[] | null | undefined }) => {
  const getIconSocial = (platform: string) => {
    switch (platform) {
      case 'instagram': {
        return <InstagramIcon sx={{ color: 'var(--white)' }} />;
      }
      case 'youtube': {
        return <YouTubeIcon sx={{ color: 'var(--white)' }} />;
      }
      case 'facebook': {
        return <FacebookIcon sx={{ color: 'var(--white)' }} />;
      }
      case 'twitter': {
        return <TwitterIcon sx={{ color: 'var(--white)' }} />;
      }
      default:
        return null;
    }
  };

  return (
    <StyledSocials>
      {socials &&
        socials.map((social: ISocialLink) => (
          <StyledSocialButton onClick={() => window.open(social.url, '_blank')} key={social.platform}>
            {getIconSocial(social.platform)}
            <Typography sx={{ color: 'var(--white)' }}>{social.platform}</Typography>
          </StyledSocialButton>
        ))}
    </StyledSocials>
  );
};

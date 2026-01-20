// mui
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, IconButton, styled, Typography } from '@mui/material';
// types
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

export const StyledSocials = styled(Box)({
  position: 'absolute',
  left: 0,
  bottom: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gridAutoFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  width: '100%',
  padding: '0',
  '@media (max-width: 768px)': {
    position: 'relative',
    gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',
    gridAutoFlow: 'row',
  },
});

export const StyledSocialButton = styled(IconButton)(() => ({
  color: 'var(--input-border)',
  borderRadius: 0,
  backgroundColor: '#0000006e',
  '&:hover': {
    color: 'var(--white)',
    backgroundColor: '#00000086',
  },
}));

// mui
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography } from '@mui/material';
// styles
import { StyledIconButton, StyledSocials } from '../StylesComponents';

const socials = [
  { id: 'in', icon: InstagramIcon, value: '@AvaBennett' },
  { id: 'tw', icon: TwitterIcon, value: '@AvaBennett' },
  { id: 'tw2', icon: TwitterIcon, value: '@AvaBennett' },
];

export const Socials = () => {
  return (
    <StyledSocials>
      {socials &&
        socials.map((social) => (
          <StyledIconButton key={social.id}>
            <social.icon sx={{ color: 'var(--white)' }} />
            <Typography sx={{ color: 'var(--white)' }}>{social.value}</Typography>
          </StyledIconButton>
        ))}
    </StyledSocials>
  );
};

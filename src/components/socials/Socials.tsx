import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ISocialLink } from '../../types/share';

const getIconSocial = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <InstagramIcon sx={{ fontSize: 20 }} />;
    case 'youtube':
      return <YouTubeIcon sx={{ fontSize: 20 }} />;
    case 'facebook':
      return <FacebookIcon sx={{ fontSize: 20 }} />;
    case 'twitter':
      return <TwitterIcon sx={{ fontSize: 20 }} />;
    default:
      return <LinkOutlinedIcon sx={{ fontSize: 20 }} />;
  }
};

const socialButtonSx = {
  color: 'rgba(255,255,255,0.65)',
  bgcolor: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 1.5,
  width: 36,
  height: 36,
  '&:hover': {
    color: '#fff',
    bgcolor: 'rgba(142,123,255,0.18)',
    borderColor: 'rgba(142,123,255,0.35)',
  },
} as const;

export const Socials = ({ socials }: { socials: ISocialLink[] | null | undefined }) => {
  if (!socials?.length) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
      {socials.map((social) => (
        <Tooltip key={`${social.platform}-${social.url}`} title={social.platform}>
          <IconButton
            size="small"
            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
            aria-label={social.platform}
            sx={socialButtonSx}
          >
            {getIconSocial(social.platform)}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

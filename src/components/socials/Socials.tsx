import { Box, IconButton, Tooltip } from '@mui/material';
import { ISocialLink } from '../../types/share';
import { getPlatformLabel, SocialPlatformIcon } from '../../constants/socialPlatforms';

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
        <Tooltip key={`${social.platform}-${social.url}`} title={getPlatformLabel(social.platform)}>
          <IconButton
            size="small"
            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
            aria-label={getPlatformLabel(social.platform)}
            sx={socialButtonSx}
          >
            <SocialPlatformIcon platform={social.platform} fontSize={20} />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

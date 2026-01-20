import { useCheckedImage } from '../../hooks/checkImgFunctions';
// mui
import { CardContent, CardMedia } from '@mui/material';
// styles
import { CardTypography, StyledVideoCard, StyledVideoCardLink } from '../StylesComponents';

export const VideoCard = ({ index }: { index: number }) => {
  const previewScr = useCheckedImage(`./img/preview/preview-0${index}.jpg`);
  return (
    <StyledVideoCard>
      <StyledVideoCardLink to="/stream" />
      <CardMedia component="img" height="180" image={previewScr} alt="video preview" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <CardTypography sx={{ fontWeight: 600 }} isEllipsis={false}>
          Latest video
        </CardTypography>
        <CardTypography fs={'14px'} c={'var(--video-card-desc)'} isEllipsis={false}>
          Here is a clip from my latest stream
        </CardTypography>
        <CardTypography fs={'14px'} c={'var(--video-card-name)'} isEllipsis={false}>
          08:54
        </CardTypography>
      </CardContent>
    </StyledVideoCard>
  );
};

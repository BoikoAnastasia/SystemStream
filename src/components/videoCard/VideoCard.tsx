import { useCheckedImage } from '../../hooks/checkImgFunctions';
// mui
import { CardContent, CardMedia } from '@mui/material';
// styles
import { CardDrawerTypography, StyledVideoCard, StyledVideoCardLink } from '../StylesComponents';

export const VideoCard = ({ index }: { index: number }) => {
  const previewScr = useCheckedImage(`./img/preview/preview-0${index}.jpg`);
  return (
    <StyledVideoCard>
      <StyledVideoCardLink to="/stream" />
      <CardMedia component="img" height="180" image={previewScr} alt="video preview" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <CardDrawerTypography sx={{ fontWeight: 600 }} isEllipsis={false}>
          Latest video
        </CardDrawerTypography>
        <CardDrawerTypography fs={'14px'} c={'var(--video-card-desc)'} isEllipsis={false}>
          Here is a clip from my latest stream
        </CardDrawerTypography>
        <CardDrawerTypography fs={'14px'} c={'var(--video-card-name)'} isEllipsis={false}>
          08:54
        </CardDrawerTypography>
      </CardContent>
    </StyledVideoCard>
  );
};

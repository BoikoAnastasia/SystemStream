import { useCheckedImage } from '../../hooks/checkImgFunctions';
// mui
import { CardContent, CardMedia, Typography } from '@mui/material';
// styles
import { StyledVideoCard, StyledVideoCardLink } from '../StylesComponents';

export const VideoCard = ({ index }: { index: number }) => {
  const previewScr = useCheckedImage(`./img/preview/preview-0${index}.jpg`);
  return (
    <StyledVideoCard>
      <StyledVideoCardLink to="/stream" />
      <CardMedia component="img" height="180" image={previewScr} alt="video preview" />
      <CardContent>
        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
          Latest video
        </Typography>
        <Typography variant="body2" sx={{ color: '#aaa' }}>
          Here is a clip from my latest stream
        </Typography>
        <Typography variant="body2" sx={{ color: '#777', mt: 0.5 }}>
          08:54
        </Typography>
      </CardContent>
    </StyledVideoCard>
  );
};

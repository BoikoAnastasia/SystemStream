// mui
import { CardMedia } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// styles
import {
  CardDrawerTypography,
  StyledButtonLive,
  StyledVideoCard,
  StyledVideoCardInfo,
  StyledVideoCardLink,
} from '../StylesComponents';
// types
import { IVideoItem } from '../../types/share';
// hooks
import { useCheckedImage } from '../../hooks/checkImgFunctions';

export const VideoView = ({ item }: { item: IVideoItem }) => {
  const previewScr = useCheckedImage(`./img/preview/preview-01.jpg`);

  return (
    <StyledVideoCard>
      <StyledVideoCardLink to={item.href} />
      <CardMedia component="img" height="200" image={previewScr} alt="video preview" />
      {item.isLive ? (
        <StyledButtonLive sx={{ position: 'absolute', top: '5px', left: '5px' }}>LIVE</StyledButtonLive>
      ) : (
        <></>
      )}
      <StyledVideoCardInfo>
        <CardDrawerTypography fs={'14px'} isEllipsis={false} sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <VisibilityIcon fontSize="small" /> {item.users}
        </CardDrawerTypography>
        <CardDrawerTypography fs={'18px'} sx={{ fontWeight: 600 }} isEllipsis={false}>
          {item.name}
        </CardDrawerTypography>
        <CardDrawerTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
          {item.type}
        </CardDrawerTypography>
      </StyledVideoCardInfo>
    </StyledVideoCard>
  );
};

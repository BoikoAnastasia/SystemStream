// mui
import { CardMedia } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// styles
import {
  CardTypography,
  StyledButtonLive,
  StyledVideoCard,
  StyledVideoCardInfo,
  StyledVideoCardLink,
} from '../StylesComponents';
// types
import { IStreamOnline } from '../../types/share';
// hooks
import { useCheckedImage } from '../../hooks/checkImgFunctions';

export const VideoView = ({ item }: { item: IStreamOnline }) => {
  // const previewScr = useCheckedImage(`./img/preview/preview-01.jpg`);

  return (
    <StyledVideoCard>
      <StyledVideoCardLink to={item.nickname} />
      <CardMedia component="img" height="200" image={useCheckedImage(item.previewUrl)} alt="video preview" />
      {item.isOnline ? (
        <StyledButtonLive sx={{ position: 'absolute', top: '5px', left: '5px' }}>LIVE</StyledButtonLive>
      ) : (
        <></>
      )}
      <StyledVideoCardInfo>
        <CardTypography fs={'14px'} isEllipsis={false} sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <VisibilityIcon fontSize="small" /> {item?.totalCount || 0}
        </CardTypography>
        <CardTypography fs={'18px'} sx={{ fontWeight: 600 }} isEllipsis={false}>
          {item.streamName}
        </CardTypography>
        <CardTypography fs={'14px'} c={'var(--hover-header-menu)'} isEllipsis={false}>
          {item.streamersLeague}
        </CardTypography>
      </StyledVideoCardInfo>
    </StyledVideoCard>
  );
};

import { Link } from 'react-router-dom';
// components
import { CardVideo } from '../cardVideo/CardVideo';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
// mui
import { Box, CardMedia } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// styles
import {
  StyledBoxListVideo,
  StyledButtonLive,
  StyledButtonWathers,
  StyledCardVideo,
  StyledListVideo,
  StyledNameComponents,
} from '../StylesComponents';
// types
import { IUserItem, IVideoItem } from '../../types/share';

interface ISectionListVideoProps {
  isVideo?: boolean;
}
interface VideoListProps extends ISectionListVideoProps {
  list: IVideoItem[];
}

interface UserListProps extends ISectionListVideoProps {
  list: IUserItem[];
}

type Props = VideoListProps | UserListProps;

export const SectionListVideo = (props: Props) => {
  const { isMobile, isLaptop } = useDeviceDetect();
  const { isVideo = true, list } = props;
  const propsStyleImg = {
    maxWidth: '144px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
  };

  return (
    <StyledBoxListVideo>
      {isVideo ? (
        <StyledListVideo>
          {(list as IVideoItem[]).map((item) => (
            <StyledCardVideo key={item.id} sx={{ position: 'relative' }}>
              <Link to={item.href} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <StyledButtonLive
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    borderRadius: '15px',
                    minWidth: '51px',
                    height: '23px',
                    textTransform: 'none',
                  }}
                >
                  Live
                </StyledButtonLive>
                <StyledButtonWathers sx={{ position: 'absolute', top: 'calc(100% - 80px)', left: '0' }}>
                  <VisibilityIcon sx={{ width: '10px', height: '10px' }} /> 10.4т
                </StyledButtonWathers>
                <CardMedia
                  component="video"
                  src={item.video}
                  sx={{
                    borderRadius: '12px',
                    objectFit: 'cover',
                    height: isMobile ? '100px' : isLaptop ? '140px' : '180px',
                  }}
                ></CardMedia>
                <Box>
                  <StyledNameComponents>{item.name}</StyledNameComponents>
                  <span style={{ fontSize: '14px', color: 'var(--background-line)' }}>{item.users}</span>
                </Box>
              </Link>
            </StyledCardVideo>
          ))}
        </StyledListVideo>
      ) : (
        <StyledListVideo columns={'5'} columnsMb={'3'}>
          {(list as IUserItem[]).map((item) => (
            <CardVideo item={item} styleProps={propsStyleImg} key={item.id} />
          ))}
        </StyledListVideo>
      )}
    </StyledBoxListVideo>
  );
};

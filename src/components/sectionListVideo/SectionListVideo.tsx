import { Link } from 'react-router-dom';
// components
import { CardVideo } from '../cardVideo/CardVideo';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
// mui
import { Box, CardMedia } from '@mui/material';
// styles
import {
  StyledBoxListVideo,
  StyledCardVideo,
  StyledListVideo,
  StyledNameComponents,
  StyledTitle,
} from '../StylesComponents';
// types
import { IUserItem, IVideoItem } from '../../types/share';

interface ISectionListVideoProps {
  title: string;
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
  const { title, isVideo = true, list } = props;
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
      <StyledTitle>{title}</StyledTitle>
      {isVideo ? (
        <StyledListVideo>
          {(list as IVideoItem[]).map((item) => (
            <StyledCardVideo key={item.id}>
              <Link to={item.href} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <CardMedia
                  component="video"
                  src={item.video}
                  controls
                  sx={{
                    borderRadius: '12px',
                    objectFit: 'cover',
                    height: isMobile ? '100px' : isLaptop ? '140px' : '180px',
                  }}
                />
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

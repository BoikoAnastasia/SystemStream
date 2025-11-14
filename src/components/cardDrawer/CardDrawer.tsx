import { useNavigate } from 'react-router-dom';
// mui
import { Avatar, Box, Button } from '@mui/material';
// types
import { ISubscriber } from '../../types/share';
// styles
import { CardDrawerTypography } from '../StylesComponents';

interface ICardDrawerProps {
  card: ISubscriber;
  variant?: 'full' | 'compact';
}

export const CardDrawer = ({ card, variant = 'full' }: ICardDrawerProps) => {
  const { nickname, profileImage, isOnline, streamersLeague, previewlUrl, streamName } = card;
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(`/${nickname}`)}>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar alt="avatar" src={profileImage} sx={{ width: '50px', height: '50px' }} />
          {/* <CardDrawerBoxWatch>{views}</CardDrawerBoxWatch> */}
        </Box>
        {variant === 'full' && (
          <Box sx={{ width: '150px' }}>
            <CardDrawerTypography isEllipsis={true}>{streamName}</CardDrawerTypography>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <CardDrawerTypography c={'#7666fc'} fs={'14px'} isEllipsis={false}>
                {nickname}
              </CardDrawerTypography>
              <CardDrawerTypography c={'var(--color-sidebar)'} fs={'14px'} isEllipsis={true}>
                {streamersLeague}
              </CardDrawerTypography>
            </Box>
          </Box>
        )}
      </Box>
    </Button>
  );
};

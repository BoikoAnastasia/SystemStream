import { useNavigate } from 'react-router-dom';
// mui
import { Avatar, Box, Button } from '@mui/material';
// types
import { ISubscriber } from '../../types/share';
// styles
import { CardDrawerBoxWatch, CardDrawerContainer } from './StyledCardDrawer';
import { CardTypography } from '../StylesComponents';

interface ICardDrawerProps {
  card: ISubscriber;
  variant?: 'full' | 'compact';
}

export const CardDrawer = ({ card, variant = 'full' }: ICardDrawerProps) => {
  const { nickname, profileImage, isOnline, streamersLeague, streamName } = card;
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(`/${nickname}`)}>
      <CardDrawerContainer>
        <Box sx={{ position: 'relative' }}>
          <Avatar alt="avatar" src={profileImage} sx={{ width: '50px', height: '50px' }} />
          {isOnline && <CardDrawerBoxWatch>Live</CardDrawerBoxWatch>}
        </Box>
        {variant === 'full' && (
          <Box sx={{ width: '150px' }}>
            <CardTypography isEllipsis={true}>{streamName}</CardTypography>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <CardTypography c={'#7666fc'} fs={'14px'} isEllipsis={false}>
                {nickname}
              </CardTypography>
              <CardTypography c={'var(--color-sidebar)'} fs={'14px'} isEllipsis={true}>
                {streamersLeague}
              </CardTypography>
            </Box>
          </Box>
        )}
      </CardDrawerContainer>
    </Button>
  );
};

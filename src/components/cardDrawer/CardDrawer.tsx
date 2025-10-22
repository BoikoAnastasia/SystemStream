import { Link } from 'react-router-dom';
// mui
import { Avatar, Box } from '@mui/material';
// types
import { CardDrawerType } from '../../types/share';
// styles
import { CardDrawerBoxWatch, CardDrawerTypography } from '../StylesComponents';

interface ICardDrawerProps {
  card: CardDrawerType;
  variant?: 'full' | 'compact';
}

export const CardDrawer = ({ card, variant = 'full' }: ICardDrawerProps) => {
  const { author, avatar, category, title, views, href } = card;

  return (
    <Link to={href!}>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar alt="avatar" src={avatar} sx={{ width: '50px', height: '50px' }} />
          <CardDrawerBoxWatch>{views}</CardDrawerBoxWatch>
        </Box>
        {variant === 'full' && (
          <Box sx={{ width: '150px' }}>
            <CardDrawerTypography isEllipsis={true}>{title}</CardDrawerTypography>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <CardDrawerTypography c={'#7666fc'} fs={'14px'} isEllipsis={false}>
                {author}
              </CardDrawerTypography>
              <CardDrawerTypography c={'var(--color-sidebar)'} fs={'14px'} isEllipsis={true}>
                {category}
              </CardDrawerTypography>
            </Box>
          </Box>
        )}
      </Box>
    </Link>
  );
};

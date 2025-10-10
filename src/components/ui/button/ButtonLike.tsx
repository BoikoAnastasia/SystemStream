import { useState } from 'react';
// mui
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// styles
import { StyledButtonLight } from '../../StylesComponents';

export const ButtonLike = () => {
  const [isLike, setIsLike] = useState(false);

  return (
    <StyledButtonLight onClick={() => setIsLike(!isLike)}>
      {isLike ? <FavoriteIcon sx={{ color: 'pink' }} /> : <FavoriteBorderIcon />}
      Отслеживать
    </StyledButtonLight>
  );
};

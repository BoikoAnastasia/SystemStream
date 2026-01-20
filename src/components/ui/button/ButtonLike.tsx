import { useState } from 'react';
// mui
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// styles
import { Button, styled } from '@mui/material';

export const ButtonLike = () => {
  const [isLike, setIsLike] = useState(false);

  return (
    <StyledButtonLight onClick={() => setIsLike(!isLike)}>
      {isLike ? <FavoriteIcon sx={{ color: 'pink' }} /> : <FavoriteBorderIcon />}
      Отслеживать
    </StyledButtonLight>
  );
};

export const StyledButtonLight = styled(Button)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  minWidth: '40px',
  height: '40px',
  fontWeight: 'bold',
  color: 'var(--background-block)',
  padding: '10px 20px',
  borderRadius: '20px',
  textTransform: 'none',
  backgroundColor: 'var(--button-light)',
}));

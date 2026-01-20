import { Box, keyframes, styled } from '@mui/material';

export const StyledBoxEffect = styled(Box)(() => ({
  position: 'absolute',
  display: 'block',
  listStyle: 'none',
  animation: `${effect} 3s ease-in-out infinite alternate`,
  backgroundImage: 'linear-gradient(-20deg, #2c2573ff 50%, #0000 50%)',
  bottom: 0,
  top: 0,
  left: '-50%',
  right: '-50%',
  opacity: 0.2,
  zIndex: -1,
}));

const effect = keyframes`
  from {
    transform: translateX(-25%);
  }
  to {
    transform: translateX(25%);
  }
}`;

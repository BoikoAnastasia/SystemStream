import { keyframes } from '@emotion/react';
import { Box, styled } from '@mui/system';

export const StyledContainerLoader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  margin: '0 auto',
}));

export const Styledloading = styled('span')(() => ({
  position: 'relative',
  display: 'inline-block',
  fontSize: '2.5rem',
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: '#FFF',
  margin: '0 auto',
  letterSpacing: '2px',
  boxSizing: 'border-box',

  '&::before': {
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    right: '54px',
    bottom: '9.5px',
    height: '24px',
    width: '5.15px',
    background: 'currentColor',
  },

  '&::after': {
    content: '""',
    width: '8px',
    height: '8px',
    position: 'absolute',
    left: '99px',
    top: '-5px',
    borderRadius: '50%',
    background: 'red',
    boxSizing: 'border-box',
    animation: `${animloader} 1s ease-in infinite`,
  },
}));

const animloader = keyframes`
  0% {
    transform: translateY(8px) scaleY(1) scaleX(1.25);
  }
  25%, 75% {
    transform: translateY(-5px) scaleY(1.2) scaleX(1);
  }
  50% {
    transform: translateY(-10px) scaleY(1) scaleX(1);
  }
  100% {
    transform: translateY(8px) scaleY(0.8) scaleX(0.8);
  }
`;

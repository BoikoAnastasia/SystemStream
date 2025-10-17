import { Box } from '@mui/material';
import { StyledBoxEffect } from '../../StylesComponents';

export const BannerEffect = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: '0.3',
      }}
    >
      <StyledBoxEffect></StyledBoxEffect>
      <StyledBoxEffect sx={{ animationDirection: 'alternate-reverse', animationDuration: '4s' }}></StyledBoxEffect>
      <StyledBoxEffect sx={{ animationDration: '5s' }}></StyledBoxEffect>
    </Box>
  );
};

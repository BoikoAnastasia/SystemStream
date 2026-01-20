import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

// VideoPlayer
export const VideoPlayerStyledBox = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '20px',
  cursor: 'pointer',
  background: 'var(--black)',
});

export const VideoFrame = styled(Box)({
  position: 'relative',
  // width: '100%',
  height: '100%',
  background: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // aspectRatio: '16 / 9',
});

export const StyledVideo = styled('video')({
  maxWidth: '100%',
  maxHeight: '100%',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  backgroundColor: 'black',
});

export const VideoPlayerStyledButtonPlay = styled(Button)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '70px',
  height: '70px',
  padding: 0,
  color: 'var(--white)',
  border: '1px solid',
  borderRadius: '50%',
  boxShadow: '-1px 0px 20px 0 #000000c2',
  transform: 'translate(-50%, -50%)',
});

export const VideoPlayerStyledBottom = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: 10,
  backgroundColor: '#00000080',
});

export const VideoPlayerStyledButtons = styled(Box)({
  display: 'flex',
  gap: 10,
  alignItems: 'center',
});

export const CircularProgressBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
  pointerEvents: 'none',
});

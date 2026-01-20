import { Box, styled } from '@mui/material';
import { StyledDragBoxProps } from '../../../types/share';

export const StyleUploadButton = styled('label')({
  textTransform: 'none',
  background: 'var(--gradient-selected)',
  color: 'var(--white)',
  borderRadius: 10,
  padding: '10px 14px',
  boxShadow: 'var(--boxShadowButton)',
  cursor: 'pointer',
  '&:hover': {
    background: 'var(--gradient-selected-hover)',
  },
});

export const StyleUploadDrag = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dragActive',
})<StyledDragBoxProps>(({ dragActive }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
  height: '150px',
  borderRadius: '12px',
  border: dragActive ? '2px solid var(--input-border)' : '1px solid var(--input-border)',
  background: dragActive ? '#ffffff74' : '#ffffff1c',
}));

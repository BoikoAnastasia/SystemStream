import { Box } from '@mui/material';
import React from 'react';
import { StyledFollowButton, StyledTitleH3 } from '../StylesComponents';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

export const ErrorBlock = ({ error, onRetry }: { error: any; onRetry: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <StyledTitleH3>{error}</StyledTitleH3>
      <StyledFollowButton onClick={() => dispatch(onRetry)}>Повторить</StyledFollowButton>
    </Box>
  );
};

export const EmptyBlock = ({ text }: { text: string }) => (
  <StyledTitleH3 sx={{ textAlign: 'center' }}>{text}</StyledTitleH3>
);

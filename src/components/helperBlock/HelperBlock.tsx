import { Box } from '@mui/material';
import React from 'react';
import { StyledFollowButton, StyledTitleH3 } from '../StylesComponents';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

const formatErrorMessage = (error: unknown) => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return 'Что-то пошло не так';
};

export const ErrorBlock = ({ error, onRetry }: { error: unknown; onRetry: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <StyledTitleH3>Что-то пошло не так: {formatErrorMessage(error)}</StyledTitleH3>
      {onRetry && <StyledFollowButton onClick={() => dispatch(onRetry)}>Повторить</StyledFollowButton>}
    </Box>
  );
};

export const EmptyBlock = ({ text }: { text: string }) => (
  <StyledTitleH3 sx={{ textAlign: 'center' }}>{text}</StyledTitleH3>
);

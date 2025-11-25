import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../../../store/store';
import { notificationWithPagination } from '../../../store/actions/NotificationActions';
// mui
import Stack from '@mui/material/Stack';
// styled
import { StyledPaginationMenu } from '../../../layout/StyledLayout';

export const PaginationComponent = ({ count = 1, pageCurrent = 1 }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(notificationWithPagination(value));
  };

  return (
    <Stack spacing={2}>
      <StyledPaginationMenu count={count} page={pageCurrent} onChange={handleChange} size="small" shape="rounded" />
    </Stack>
  );
};

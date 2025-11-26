import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../../../store/store';
// mui
import Stack from '@mui/material/Stack';
// styled
import { StyledPaginationMenu } from '../../../layout/StyledLayout';

interface PaginationProps {
  count?: number;
  pageCurrent?: number;
  isSmall?: boolean;
  functionDispatch: (page: number) => void;
}

export const PaginationComponent = ({
  count = 1,
  pageCurrent = 1,
  isSmall = true,
  functionDispatch,
}: PaginationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(functionDispatch(value) as any);
  };

  return (
    <Stack spacing={2}>
      <StyledPaginationMenu
        count={count}
        page={pageCurrent}
        onChange={handleChange}
        size={isSmall ? 'small' : 'large'}
        shape="rounded"
      />
    </Stack>
  );
};

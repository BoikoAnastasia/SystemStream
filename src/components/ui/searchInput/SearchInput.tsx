import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { StyledButtonSearch } from '../../StylesComponents';

export const SearchInput = ({ width, height }: { width?: string; height?: string }) => {
  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-end', width: width ? width : '100%' }}>
      <SearchIcon
        sx={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-65%)',
          color: 'var(--white)',
          mr: 1,
          my: 0.5,
        }}
      />
      <StyledButtonSearch placeholder="Поиск" h={height} />
    </Box>
  );
};

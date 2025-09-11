import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { StyledButtonSearch } from '../../StylesComponents';

export const SearchInput = () => {
  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
      <SearchIcon sx={{ position: 'absolute', left: '20px', top: '5px', color: 'white', mr: 1, my: 0.5 }} />
      <StyledButtonSearch placeholder="Поиск" />
    </Box>
  );
};

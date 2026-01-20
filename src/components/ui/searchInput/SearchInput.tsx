import { StyledSearchContainer, StyledButtonSearch, StyledSearchIcon } from './StyledSearchInput';

export const SearchInput = ({ width, height }: { width?: string; height?: string }) => {
  return (
    <StyledSearchContainer sx={{ width: width ? width : '100%' }}>
      <StyledSearchIcon />
      <StyledButtonSearch placeholder="Поиск" h={height} />
    </StyledSearchContainer>
  );
};

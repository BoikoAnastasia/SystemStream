import { Box } from '@mui/material';
import { StyledSidebarList, StyledSidebarListItem } from '../../StylesComponents';

export const ListSettings = ({ levels, onClick }: any) => {
  return (
    <Box sx={{ position: 'absolute', bottom: '74px', right: '40px', padding: '20px', backgroundColor: '#00000080' }}>
      <StyledSidebarList>
        {levels.map((level: any, i: number) => (
          <StyledSidebarListItem key={level.height} onClick={() => onClick(i)} sx={{ width: '100%' }}>
            {level.height}p
          </StyledSidebarListItem>
        ))}
        <StyledSidebarListItem onClick={() => onClick(-1)}>Авто</StyledSidebarListItem>
      </StyledSidebarList>
    </Box>
  );
};

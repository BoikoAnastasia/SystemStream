import { Box } from '@mui/material';
import { StyledSidebarList, StyledSidebarListItem } from '../../StylesComponents';

export const ListSettings = ({ levels, onClick, currentIndex }: any) => {
  return (
    <Box sx={{ position: 'absolute', bottom: '74px', right: '52px', backgroundColor: '#00000080' }}>
      <StyledSidebarList sx={{ padding: '8px' }}>
        {levels.map((level: any, i: number) => (
          <StyledSidebarListItem
            key={level.height}
            onClick={() => onClick(i)}
            sx={{
              width: '100%',
              justifyContent: 'center',
              backgroundColor: currentIndex === i ? 'rgb(61 58 108)' : 'transparent',
            }}
          >
            {level.height}p
          </StyledSidebarListItem>
        ))}
        <StyledSidebarListItem
          onClick={() => onClick(-1)}
          sx={{
            width: '100%',
            justifyContent: 'center',
            backgroundColor: currentIndex === -1 ? 'rgb(61 58 108)' : 'transparent',
          }}
        >
          Авто
        </StyledSidebarListItem>
      </StyledSidebarList>
    </Box>
  );
};

import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyledButtonLive, StyledTitle } from '../../../../components/StylesComponents';
import { StyledButtonWathers, StyledHeaderStreamPage } from '../../StyledStreamPage';
import { IStream } from '../../../../types/share';

export const HeaderStreamPage = ({ streamInfo, viewerCount }: { streamInfo: IStream | null; viewerCount: number }) => {
  if (!streamInfo) {
    return (
      <StyledHeaderStreamPage>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <StyledTitle>Стрим оффлайн</StyledTitle>
          <StyledButtonWathers>
            <VisibilityIcon sx={{ width: '10px', height: '10px' }} /> {String(viewerCount)}
          </StyledButtonWathers>
        </Box>
      </StyledHeaderStreamPage>
    );
  }

  return (
    <StyledHeaderStreamPage>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', minWidth: 0 }}>
          <StyledButtonLive>В эфире</StyledButtonLive>
          <StyledButtonWathers>
            <VisibilityIcon sx={{ width: '10px', height: '10px' }} /> {String(viewerCount)}
          </StyledButtonWathers>
        </Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {streamInfo.streamName}
        </Typography>
      </Box>
    </StyledHeaderStreamPage>
  );
};

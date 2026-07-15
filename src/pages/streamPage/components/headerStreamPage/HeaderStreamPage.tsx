import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyledButtonLive, StyledTitle } from '../../../../components/StylesComponents';
import { StyledButtonWathers, StyledHeaderStreamPage } from '../../StyledStreamPage';
import { IStream } from '../../../../types/share';
import { formatLiveDuration } from '../../../../utils/formatDate';

const LiveDurationBadge = ({ startedAt }: { startedAt: string | Date }) => {
  const [label, setLabel] = useState(() => formatLiveDuration(startedAt));

  useEffect(() => {
    const update = () => setLabel(formatLiveDuration(startedAt));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, [startedAt]);

  return (
    <StyledButtonWathers>
      <AccessTimeIcon sx={{ width: 10, height: 10 }} />
      {label}
    </StyledButtonWathers>
  );
};

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
          {streamInfo.startedAt && <LiveDurationBadge startedAt={streamInfo.startedAt} />}
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

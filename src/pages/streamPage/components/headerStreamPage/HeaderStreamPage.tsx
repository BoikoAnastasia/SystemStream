// mui
import { Avatar, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// styles
import {
  StyledHeaderStreamPage,
  StyledButtonLive,
  StyledButtonWathers,
  StyledTitle,
  StyledSpanDark,
} from '../../../../components/StylesComponents';
// types
import { IStream } from '../../../../types/share';
export const HeaderStreamPage = ({ streamInfo, viewerCount }: { streamInfo: IStream | null; viewerCount: number }) => {
  // OFFLINE состояние

  console.log(streamInfo?.previewUrl, `${process.env.REACT_APP_API_LOCAL}${streamInfo?.previewUrl}`);

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

  // LIVE состояние
  return (
    <StyledHeaderStreamPage>
      <Box
        sx={{
          display: 'grid',
          gridTemplateAreas: `'avatar streamInfo' 'avatar nameStream'`,
          gap: '0px 6px',
          justifyItems: 'start',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ gridArea: 'avatar' }}
          src={
            streamInfo?.previewUrl
              ? `${process.env.REACT_APP_API_LOCAL}${streamInfo?.previewUrl}`
              : '/default-avatar.jpg'
          }
        ></Avatar>

        <Box sx={{ gridArea: 'streamInfo', display: 'flex', alignItems: 'center' }}>
          <StyledTitle style={{ marginRight: '10px' }}>{streamInfo.streamerName}</StyledTitle>

          <StyledButtonLive>В эфире</StyledButtonLive>

          <StyledButtonWathers>
            <VisibilityIcon sx={{ width: '10px', height: '10px' }} /> {String(viewerCount)}
          </StyledButtonWathers>
        </Box>

        <StyledSpanDark style={{ gridArea: 'nameStream' }}>Сейчас в эфире: {streamInfo.streamName}</StyledSpanDark>
      </Box>
    </StyledHeaderStreamPage>
  );
};

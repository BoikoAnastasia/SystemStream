import { Avatar, Box } from '@mui/material';
import {
  StyledHeaderStreamPage,
  StyledButtonLive,
  StyledButtonWathers,
  StyledTitle,
  StyledSpanDark,
} from '../../../../components/StylesComponents';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IStream } from '../../../../types/share';

export const HeaderStreamPage = ({ streamInfo }: { streamInfo: IStream }) => {
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
        <Avatar sx={{ gridArea: 'avatar' }} src="./img/users/user-01.jpg"></Avatar>
        <Box sx={{ gridArea: 'streamInfo', display: 'flex', alignItems: 'center' }}>
          <StyledTitle style={{ marginRight: '10px' }}>{streamInfo.streamerName}</StyledTitle>
          {streamInfo.isLive ? <StyledButtonLive>В эфире</StyledButtonLive> : <></>}
          <StyledButtonWathers>
            <VisibilityIcon sx={{ width: '10px', height: '10px' }} /> {streamInfo.totalViews}
          </StyledButtonWathers>
        </Box>
        <StyledSpanDark style={{ gridArea: 'nameStream' }}>Сейчас в эфире: {streamInfo.streamName}</StyledSpanDark>
      </Box>
    </StyledHeaderStreamPage>
  );
};

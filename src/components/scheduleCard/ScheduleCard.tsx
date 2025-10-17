// hooks
import { useCheckedImage } from '../../hooks/checkImgFunctions';
// mui
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, CardMedia } from '@mui/material';
// styles
import {
  StyledButtonLive,
  StyledButtonReminder,
  StyledNameComponents,
  StyledScheduleCard,
  StyledScheduleCardText,
} from '../StylesComponents';
import { useState } from 'react';

export const ScheduleCard = ({ live }: { live: boolean }) => {
  const [activeReminder, setActiveReminder] = useState(false);

  const previewScr = useCheckedImage(`./img/preview/preview-01.jpg`);
  return (
    <StyledScheduleCard>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {live ? <StyledButtonLive sx={{ position: 'absolute', top: 0, left: 0 }}>LIVE</StyledButtonLive> : <></>}
        <CardMedia component="img" height="120" image={previewScr} alt="video preview" sx={{ borderRadius: '5px' }} />
      </Box>
      <StyledNameComponents>Прохождение новинки</StyledNameComponents>
      <StyledScheduleCardText>16:00, 16 февраля</StyledScheduleCardText>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <StyledScheduleCardText>Игры</StyledScheduleCardText>
        <StyledButtonReminder onClick={() => setActiveReminder(!activeReminder)}>
          <NotificationsIcon fontSize="small" sx={{ color: activeReminder ? 'rgb(229 229 95)' : 'white' }} />
          Напомнить
        </StyledButtonReminder>
      </Box>
    </StyledScheduleCard>
  );
};

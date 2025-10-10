import { Avatar, Box } from '@mui/material';
import {
  StyledHeaderStreamPage,
  StyledButtonDark,
  StyledButtonLive,
  StyledButtonWathers,
} from '../../../../components/StylesComponents';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ButtonLike } from '../../../../components/ui/button/ButtonLike';

export const HeaderStreamPage = () => {
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
          <h2 style={{ marginRight: '10px' }}>Ava Bennett</h2>
          <StyledButtonLive>В эфире</StyledButtonLive>
          <StyledButtonWathers>
            <VisibilityIcon sx={{ width: '10px', height: '10px' }} /> 10.4т
          </StyledButtonWathers>
        </Box>
        <h5 style={{ gridArea: 'nameStream' }}>Сейчас в эфире: Новые айфоны - Смотрим презентацию</h5>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <ButtonLike />
        <StyledButtonDark>Подписаться</StyledButtonDark>
      </Box>
    </StyledHeaderStreamPage>
  );
};

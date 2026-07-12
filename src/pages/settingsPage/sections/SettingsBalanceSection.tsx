import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { Box, Typography } from '@mui/material';
import {
  StyledSettingsPlaceholder,
  StyledSettingsSectionHint,
  StyledSettingsSectionTitle,
} from '../StyledSettingsPage';

export const SettingsBalanceSection = () => (
  <Box>
    <StyledSettingsSectionTitle>Баланс</StyledSettingsSectionTitle>
    <StyledSettingsSectionHint>
      Пополнение и история операций появятся в одном из следующих обновлений.
    </StyledSettingsSectionHint>

    <StyledSettingsPlaceholder>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SavingsOutlinedIcon sx={{ color: 'rgba(142,123,255,0.75)', fontSize: 22 }} />
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>0 ₽</Typography>
      </Box>
      <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
        Сейчас баланс не используется. Когда появится монетизация или донаты, управление будет здесь — без доступа для
        модераторов и команды канала.
      </Typography>
    </StyledSettingsPlaceholder>
  </Box>
);

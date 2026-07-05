import { Box, Chip, Typography } from '@mui/material';
import { DashboardMode } from '../dashboard.constants';
import {
  StyledDashboardPlaceholder,
  StyledDashboardSectionHint,
  StyledDashboardSectionTitle,
} from '../StyledDashboardPage';

const PLACEHOLDER_ITEMS = ['Название стрима', 'Категория и теги', 'Язык эфира', 'Анонс / расписание'];

export const DashboardStreamSection = ({ channelNickname, mode }: { channelNickname: string; mode: DashboardMode }) => (
  <Box>
    <StyledDashboardSectionTitle>Настройки эфира</StyledDashboardSectionTitle>
    <StyledDashboardSectionHint>
      {mode === 'own' ? 'Базовые параметры вашего текущего стрима.' : `Параметры эфира канала ${channelNickname}.`}
    </StyledDashboardSectionHint>

    <StyledDashboardPlaceholder>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Скоро здесь</Typography>
      {PLACEHOLDER_ITEMS.map((item) => (
        <Chip
          key={item}
          label={item}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            bgcolor: 'rgba(142,123,255,0.12)',
            color: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(142,123,255,0.2)',
          }}
        />
      ))}
    </StyledDashboardPlaceholder>
  </Box>
);

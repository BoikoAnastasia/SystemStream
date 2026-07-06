import { Box, Typography } from '@mui/material';
import { CHAT_SLOW_MODE_COLOR, CHAT_SLOW_MODE_COLOR_RGB, CHAT_SLOW_MODE_PRESETS } from './chat.constants';

type SlowModePresetsProps = {
  value: number;
  onChange: (seconds: number) => void;
  disabled?: boolean;
  compact?: boolean;
};

const formatPresetLabel = (seconds: number) => (seconds === 0 ? 'Выкл' : `${seconds} сек`);

export const SlowModePresets = ({ value, onChange, disabled, compact }: SlowModePresetsProps) => (
  <Box>
    {!compact && (
      <>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#fff', mb: 0.5 }}>Slow mode</Typography>
        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', mb: 1.5 }}>
          Задержка между сообщениями зрителей
        </Typography>
      </>
    )}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {CHAT_SLOW_MODE_PRESETS.map((seconds) => {
        const active = value === seconds;
        return (
          <Box
            key={seconds}
            component="button"
            type="button"
            disabled={disabled}
            onClick={() => onChange(seconds)}
            sx={{
              border: 'none',
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              px: 1.25,
              py: 0.75,
              borderRadius: 1,
              fontSize: 13,
              fontWeight: active ? 700 : 500,
              fontFamily: 'inherit',
              color: active ? CHAT_SLOW_MODE_COLOR : 'rgba(255,255,255,0.85)',
              bgcolor: active ? `rgba(${CHAT_SLOW_MODE_COLOR_RGB}, 0.16)` : 'rgba(255,255,255,0.06)',
              '&:hover': disabled
                ? undefined
                : {
                    bgcolor: active ? `rgba(${CHAT_SLOW_MODE_COLOR_RGB}, 0.24)` : 'rgba(255,255,255,0.1)',
                  },
            }}
          >
            {formatPresetLabel(seconds)}
          </Box>
        );
      })}
    </Box>
  </Box>
);

import { Box, IconButton, Popover, Tooltip, Typography } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useState } from 'react';
import { CHAT_SLOW_MODE_COLOR, CHAT_SLOW_MODE_COLOR_RGB, CHAT_SLOW_MODE_PRESETS } from './chat.constants';
import { getChatPopoverContainer } from './chat.utils';

type ChatSlowModeButtonProps = {
  slowModeSeconds: number;
  onSetSlowMode: (seconds: number) => void;
};

const formatPresetLabel = (seconds: number) => (seconds === 0 ? 'Выкл' : `${seconds} сек`);

export const ChatSlowModeButton = ({ slowModeSeconds, onSetSlowMode }: ChatSlowModeButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isActive = slowModeSeconds > 0;

  return (
    <>
      <Tooltip title="Slow mode">
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label="Настройка slow mode"
          sx={{
            color: isActive ? CHAT_SLOW_MODE_COLOR : 'rgba(255,255,255,0.6)',
            bgcolor: isActive ? `rgba(${CHAT_SLOW_MODE_COLOR_RGB}, 0.14)` : 'transparent',
            '&:hover': {
              color: isActive ? CHAT_SLOW_MODE_COLOR : '#fff',
              bgcolor: isActive ? `rgba(${CHAT_SLOW_MODE_COLOR_RGB}, 0.22)` : 'rgba(255,255,255,0.08)',
            },
          }}
        >
          <TimerOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        container={getChatPopoverContainer}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          root: { sx: { zIndex: 10000 } },
          paper: {
            sx: {
              bgcolor: 'rgba(18,16,32,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              p: 1.5,
              minWidth: 180,
            },
          },
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#fff', mb: 1 }}>Slow mode</Typography>
        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', mb: 1.5 }}>
          Задержка между сообщениями зрителей
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {CHAT_SLOW_MODE_PRESETS.map((seconds) => {
            const presetActive = slowModeSeconds === seconds;
            return (
              <Box
                key={seconds}
                component="button"
                type="button"
                onClick={() => {
                  onSetSlowMode(seconds);
                  setAnchorEl(null);
                }}
                sx={{
                  border: 'none',
                  cursor: 'pointer',
                  px: 1.25,
                  py: 0.75,
                  borderRadius: 1,
                  fontSize: 13,
                  fontWeight: presetActive ? 700 : 500,
                  fontFamily: 'inherit',
                  color: presetActive ? CHAT_SLOW_MODE_COLOR : 'rgba(255,255,255,0.85)',
                  bgcolor: presetActive ? `rgba(${CHAT_SLOW_MODE_COLOR_RGB}, 0.16)` : 'rgba(255,255,255,0.06)',
                  '&:hover': {
                    bgcolor: presetActive ? `rgba(${CHAT_SLOW_MODE_COLOR_RGB}, 0.24)` : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {formatPresetLabel(seconds)}
              </Box>
            );
          })}
        </Box>
      </Popover>
    </>
  );
};

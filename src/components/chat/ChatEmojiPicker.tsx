import { Box, IconButton, Popover, Tooltip } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useState } from 'react';
import { CHAT_EMOJIS } from './chat.constants';
import { getChatPopoverContainer } from './chat.utils';

type ChatEmojiPickerProps = {
  disabled?: boolean;
  onSelect: (emoji: string) => void;
};

const pickerScrollbarSx = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(142, 123, 255, 0.42) transparent',
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(142,123,255,0.45)',
    borderRadius: 999,
  },
} as const;

export const ChatEmojiPicker = ({ disabled, onSelect }: ChatEmojiPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
  };

  return (
    <>
      <Tooltip title="Эмодзи">
        <IconButton
          disabled={disabled}
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            color: anchorEl ? '#8e7bff' : 'rgba(255,255,255,0.6)',
            flexShrink: 0,
            '&:hover': { color: '#fff' },
          }}
          aria-label="Выбрать эмодзи"
        >
          <EmojiEmotionsOutlinedIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        container={getChatPopoverContainer}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          root: { sx: { zIndex: 10000 } },
          paper: {
            sx: {
              bgcolor: 'rgba(18,16,32,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              p: 1,
              width: 'min(320px, calc(100vw - 24px))',
              maxWidth: 'none',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
            gap: 0.5,
            maxHeight: 'min(240px, calc(100dvh - 160px))',
            overflowY: 'auto',
            overflowX: 'hidden',
            ...pickerScrollbarSx,
          }}
        >
          {CHAT_EMOJIS.map((emoji) => (
            <Box
              key={emoji}
              component="button"
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(emoji)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minWidth: 36,
                minHeight: 36,
                aspectRatio: '1',
                p: 0,
                m: 0,
                border: 'none',
                borderRadius: 1,
                bgcolor: 'transparent',
                color: 'inherit',
                fontSize: 22,
                lineHeight: 1,
                cursor: 'pointer',
                fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              {emoji}
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
};

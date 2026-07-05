import { Box, IconButton, Popover, Tooltip, Typography } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useState } from 'react';
import { CHAT_EMOJIS } from './chat.constants';
import { getChatPopoverContainer } from './chat.utils';

type ChatEmojiPickerProps = {
  disabled?: boolean;
  onSelect: (emoji: string) => void;
};

export const ChatEmojiPicker = ({ disabled, onSelect }: ChatEmojiPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
              maxWidth: 280,
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 0.25,
          }}
        >
          {CHAT_EMOJIS.map((emoji) => (
            <IconButton
              key={emoji}
              size="small"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect(emoji)}
              sx={{
                fontSize: 20,
                borderRadius: 1,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              {emoji}
            </IconButton>
          ))}
        </Box>
      </Popover>
    </>
  );
};

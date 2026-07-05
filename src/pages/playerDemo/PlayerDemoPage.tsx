/**
 * TEMP: демо-страница плеера.
 * Удаление: папка pages/playerDemo/ + маршрут /player-demo в routers.tsx
 */
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Box, Button, Chip, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DemoVideoPlayer } from './DemoVideoPlayer';
import { DEMO_STREAM_PRESETS, KEYBOARD_SHORTCUTS } from './demoPlayer.constants';

export const PlayerDemoPage = () => {
  const [presetId, setPresetId] = useState(DEMO_STREAM_PRESETS[0].id);
  const [customUrl, setCustomUrl] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const preset = DEMO_STREAM_PRESETS.find((p) => p.id === presetId) ?? DEMO_STREAM_PRESETS[0];

  const activeSrc = useCustom && customUrl.trim() ? customUrl.trim() : preset.url;
  const activeMode = useCustom ? (customUrl.includes('/hls/') ? 'live' : 'vod') : preset.mode;

  const features = useMemo(
    () => [
      'ABR / ручной выбор качества',
      'Live badge + кнопка «Вернуться в эфир» при отставании (L)',
      'Громкость 75% по умолчанию, сохраняется между визитами',
      'Горячие клавиши (EN/RU — по расположению на клавиатуре)',
      'Картинка в картинке, чат в полном экране, полный экран',
      'Пауза live без смены кадра',
    ],
    []
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--background)',
        color: 'var(--white)',
        py: 3,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ color: '#aaa', mb: 2 }}>
          На главную
        </Button>

        <Alert
          severity="warning"
          icon={<DeleteOutlineIcon />}
          sx={{ mb: 3, bgcolor: 'rgba(255,245,157,0.08)', color: '#ffe082', border: '1px solid rgba(255,245,157,0.2)' }}
        >
          <strong>Временная demo-страница.</strong> Изолирована в <code>src/pages/playerDemo/</code>. Чтобы удалить:
          снести эту папку и строку <code>/player-demo</code> в <code>routers.tsx</code>.
        </Alert>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Демо плеера
        </Typography>
        <Typography sx={{ color: '#aaa', mb: 3 }}>
          Песочница для «топового» плеера — не связана со StreamPage и production VideoPlayer.
        </Typography>

        <Paper
          sx={{
            p: 2,
            mb: 3,
            bgcolor: 'var(--background-card)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 2,
          }}
        >
          <Typography sx={{ mb: 1.5, fontWeight: 600 }}>Источник</Typography>
          <ToggleButtonGroup
            value={useCustom ? 'custom' : 'preset'}
            exclusive
            size="small"
            sx={{ mb: 2 }}
            onChange={(_, v) => v && setUseCustom(v === 'custom')}
          >
            <ToggleButton value="preset">Пресеты</ToggleButton>
            <ToggleButton value="custom">Свой URL</ToggleButton>
          </ToggleButtonGroup>

          {!useCustom ? (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {DEMO_STREAM_PRESETS.map((p) => (
                <Chip
                  key={p.id}
                  label={p.label}
                  clickable
                  color={presetId === p.id ? 'secondary' : 'default'}
                  onClick={() => setPresetId(p.id)}
                  sx={{ bgcolor: presetId === p.id ? undefined : 'rgba(255,255,255,0.06)' }}
                />
              ))}
            </Box>
          ) : (
            <TextField
              fullWidth
              size="small"
              label="HLS URL (полный или /hls/...)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="/hls/live_xxx/master.m3u8"
              sx={{
                '& .MuiInputBase-root': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#888' },
              }}
            />
          )}

          <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: '#666' }}>
            Активно: {activeSrc} · режим {activeMode}
          </Typography>
        </Paper>

        <DemoVideoPlayer src={activeSrc} mode={activeMode} variant="standalone" />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 4 }}>
          <Paper sx={{ p: 2, bgcolor: 'var(--background-card)', borderRadius: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1.5 }}>Возможности demo-плеера</Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: '#bbb', lineHeight: 1.9 }}>
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 2, bgcolor: 'var(--background-card)', borderRadius: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1.5 }}>Горячие клавиши</Typography>
            <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none', color: '#bbb', lineHeight: 2 }}>
              {KEYBOARD_SHORTCUTS.map((s) => (
                <li key={s.keys}>
                  <Box component="span" sx={{ fontFamily: 'monospace', color: '#8e7bff', mr: 1 }}>
                    {s.keys}
                  </Box>
                  — {s.action}
                </li>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerDemoPage;

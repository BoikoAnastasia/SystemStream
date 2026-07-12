import { Box, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useSettingsNotice } from '../context/SettingsNoticeContext';
import { settingsPanelSx } from '../settings.styles';

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

type ProfileImageFieldProps = {
  label: string;
  hint?: string;
  name: string;
  currentUrl?: string | null;
  value: File | null;
  setFieldValue: (field: string, value: File | null) => void;
  error?: string;
  touched?: boolean;
};

export const ProfileImageField = ({
  label,
  hint,
  name,
  currentUrl,
  value,
  setFieldValue,
  error,
  touched,
}: ProfileImageFieldProps) => {
  const { showNotice } = useSettingsNotice();
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const displayUrl = preview || currentUrl || null;

  const applyFile = (file: File | null) => {
    if (file) {
      if (file.size > MAX_SIZE) {
        showNotice('Файл слишком большой (макс. 5MB)', 'error');
        return;
      }
      if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
        showNotice('Неверный формат изображения', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    setFieldValue(name, file);
  };

  return (
    <Box sx={{ ...settingsPanelSx, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{label}</Typography>
        {hint && (
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', mt: 0.5, lineHeight: 1.4 }}>
            {hint}
          </Typography>
        )}
      </Box>

      {displayUrl && (
        <Box
          component="img"
          src={displayUrl}
          alt=""
          sx={{
            width: '100%',
            maxHeight: 220,
            objectFit: 'cover',
            borderRadius: 1.5,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      )}

      <Box
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          applyFile(e.dataTransfer.files[0] || null);
        }}
        sx={{
          p: 2,
          borderRadius: 1.5,
          border: `1px dashed ${dragActive ? 'rgba(142,123,255,0.55)' : 'rgba(255,255,255,0.16)'}`,
          bgcolor: dragActive ? 'rgba(142,123,255,0.08)' : 'rgba(255,255,255,0.02)',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', mb: 1 }}>
          Перетащите изображение или выберите файл
        </Typography>
        <Box
          component="label"
          sx={{
            display: 'inline-flex',
            px: 2,
            py: 0.75,
            borderRadius: 1,
            bgcolor: 'rgba(142,123,255,0.18)',
            color: '#ddd',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(142,123,255,0.28)' },
          }}
        >
          Загрузить
          <input type="file" hidden accept="image/*" onChange={(e) => applyFile(e.currentTarget.files?.[0] || null)} />
        </Box>
        {value && (
          <Typography
            component="button"
            type="button"
            onClick={() => applyFile(null)}
            sx={{
              display: 'block',
              mx: 'auto',
              mt: 1,
              border: 0,
              background: 'none',
              color: 'rgba(255,255,255,0.45)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Сбросить выбор
          </Typography>
        )}
      </Box>

      {touched && error && <Typography sx={{ fontSize: 12, color: '#ff8a8a' }}>{error}</Typography>}
    </Box>
  );
};

export const SettingsFormActions = ({ onReset, isSubmitting }: { onReset: () => void; isSubmitting?: boolean }) => (
  <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end', flexWrap: 'wrap', pt: 1 }}>
    <Box
      component="button"
      type="button"
      onClick={onReset}
      sx={{
        px: 2.5,
        py: 1,
        borderRadius: 1,
        border: '1px solid rgba(255,255,255,0.18)',
        bgcolor: 'transparent',
        color: 'rgba(255,255,255,0.85)',
        fontSize: 14,
        cursor: 'pointer',
        '&:hover': { borderColor: 'rgba(142,123,255,0.45)', bgcolor: 'rgba(142,123,255,0.08)' },
      }}
    >
      Отмена
    </Box>
    <Box
      component="button"
      type="submit"
      disabled={isSubmitting}
      sx={{
        px: 3,
        py: 1,
        borderRadius: 1,
        border: 0,
        bgcolor: '#6d5dfb',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        cursor: isSubmitting ? 'default' : 'pointer',
        opacity: isSubmitting ? 0.7 : 1,
        '&:hover': { bgcolor: isSubmitting ? '#6d5dfb' : '#8e7bff' },
      }}
    >
      {isSubmitting ? 'Сохранение...' : 'Сохранить'}
    </Box>
  </Box>
);

export const SettingsFieldBlock = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{title}</Typography>
    {hint && <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', mb: 0.5 }}>{hint}</Typography>}
    {children}
  </Box>
);

import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from '@mui/material';
import Cropper, { Area } from 'react-easy-crop';
import { CROP_ASPECT, getCroppedImageFile, ImageCropAspect } from '../../utils/cropImage';

type ImageCropDialogProps = {
  open: boolean;
  imageSrc: string | null;
  aspect: ImageCropAspect;
  title?: string;
  onCancel: () => void;
  onComplete: (file: File) => void;
};

export const ImageCropDialog = ({
  open,
  imageSrc,
  aspect,
  title = 'Выберите область',
  onCancel,
  onComplete,
}: ImageCropDialogProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setError(null);
    setSaving(false);
  }, [open, imageSrc]);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setSaving(true);
    setError(null);
    try {
      const file = await getCroppedImageFile(imageSrc, croppedAreaPixels, aspect, 'upload.jpg');
      onComplete(file);
    } catch {
      setError('Не удалось обрезать изображение');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#16141f',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 18, fontWeight: 700, pb: 1 }}>{title}</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', mb: 1.5 }}>
          Перетащите фото и измените масштаб, чтобы выбрать, что попадёт в кадр.
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 320,
            bgcolor: '#0c0a14',
            borderRadius: 1.5,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={CROP_ASPECT[aspect]}
              cropShape={aspect === 'avatar' ? 'round' : 'rect'}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </Box>
        <Box sx={{ mt: 2, px: 0.5 }}>
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', mb: 0.5 }}>Масштаб</Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.05}
            onChange={(_, value) => setZoom(value as number)}
            sx={{
              color: '#8e7bff',
              '& .MuiSlider-rail': { opacity: 0.3 },
            }}
          />
        </Box>
        {error && <Typography sx={{ fontSize: 12, color: '#ff8a8a', mt: 1 }}>{error}</Typography>}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onCancel}
          disabled={saving}
          sx={{
            textTransform: 'none',
            color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={saving || !croppedAreaPixels}
          variant="contained"
          sx={{
            textTransform: 'none',
            bgcolor: '#6d5dfb',
            '&:hover': { bgcolor: '#8e7bff' },
          }}
        >
          {saving ? 'Сохранение...' : 'Применить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

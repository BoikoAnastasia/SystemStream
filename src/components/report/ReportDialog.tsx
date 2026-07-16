import { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { CreateReportPayload, REPORT_REASON_OPTIONS, ReportReason, createPlatformReport } from '../../api/reportsApi';

type ReportDialogProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  payload: Omit<CreateReportPayload, 'reason' | 'details'>;
  onClose: () => void;
  onSubmitted?: () => void;
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    bgcolor: 'rgba(255,255,255,0.04)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.55)' },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.6)' },
};

export const ReportDialog = ({ open, title, subtitle, payload, onClose, onSubmitted }: ReportDialogProps) => {
  const [reason, setReason] = useState<ReportReason>('spam');
  const [details, setDetails] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const resetAndClose = () => {
    setReason('spam');
    setDetails('');
    setError(null);
    setDone(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await createPlatformReport({
      ...payload,
      reason,
      details: details.trim() || undefined,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || 'Не удалось отправить жалобу');
      return;
    }

    setDone(true);
    onSubmitted?.();
  };

  return (
    <Dialog
      open={open}
      onClose={resetAndClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: 'rgba(18,16,32,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          {subtitle && <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{subtitle}</Typography>}

          {done ? (
            <Typography sx={{ fontSize: 14, color: '#6fff79' }}>
              Жалоба отправлена. Спасибо, модерация рассмотрит её.
            </Typography>
          ) : (
            <>
              <TextField
                select
                label="Причина"
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                fullWidth
                sx={fieldSx}
              >
                {REPORT_REASON_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Комментарий (необязательно)"
                value={details}
                onChange={(e) => setDetails(e.target.value.slice(0, 500))}
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                helperText={`${details.length} / 500`}
                FormHelperTextProps={{ sx: { color: 'rgba(255,255,255,0.35)', textAlign: 'right' } }}
                sx={fieldSx}
              />
              {error && <Typography sx={{ fontSize: 13, color: '#ff8a8a' }}>{error}</Typography>}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={resetAndClose} sx={{ textTransform: 'none', color: 'rgba(255,255,255,0.7)' }}>
            {done ? 'Закрыть' : 'Отмена'}
          </Button>
          {!done && (
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{ textTransform: 'none', bgcolor: '#6d5dfb', '&:hover': { bgcolor: '#8e7bff' } }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Chip, CircularProgress, TextField, Typography } from '@mui/material';
import { PlatformReport, fetchStaffReports, updateStaffReport } from '../../../api/reportsApi';
import { StyledDashboardSectionHint, StyledDashboardSectionTitle } from '../../dashboardPage/StyledDashboardPage';

const panelSx = {
  p: 2,
  borderRadius: 2,
  bgcolor: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
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

const STATUS_FILTERS = [
  { value: 'new', label: 'Новые' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'resolved', label: 'Решённые' },
  { value: 'rejected', label: 'Отклонённые' },
  { value: '', label: 'Все' },
];

const statusColor = (status: string) => {
  if (status === 'new') return '#ffb74d';
  if (status === 'in_progress') return '#8e7bff';
  if (status === 'resolved') return '#6fff79';
  return 'rgba(255,255,255,0.45)';
};

const reasonLabel = (reason: string) => {
  const map: Record<string, string> = {
    spam: 'Спам',
    harassment: 'Травля',
    hate: 'Hate',
    illegal: 'Illegal',
    other: 'Другое',
  };
  return map[reason] || reason;
};

export const StaffReportsSection = () => {
  const [status, setStatus] = useState('new');
  const [reports, setReports] = useState<PlatformReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await fetchStaffReports(status, 100);
    setIsLoading(false);
    if (!result.success) {
      setError(result.message);
      setReports([]);
      return;
    }
    setReports(result.reports);
  }, [status]);

  useEffect(() => {
    void load();
  }, [load]);

  const runUpdate = async (id: number, payload: Parameters<typeof updateStaffReport>[1]) => {
    setBusyId(id);
    setActionError(null);
    const result = await updateStaffReport(id, payload);
    setBusyId(null);
    if (!result.success) {
      setActionError(result.message);
      return;
    }
    await load();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} sx={{ color: '#8e7bff' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <StyledDashboardSectionTitle>Жалобы</StyledDashboardSectionTitle>
        <StyledDashboardSectionHint>
          Очередь платформенных репортов. Можно взять в работу, отклонить или выдать mute.
        </StyledDashboardSectionHint>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {STATUS_FILTERS.map((item) => (
          <Chip
            key={item.value || 'all'}
            label={item.label}
            onClick={() => setStatus(item.value)}
            size="small"
            sx={{
              bgcolor: status === item.value ? 'rgba(142,123,255,0.25)' : 'rgba(255,255,255,0.06)',
              color: '#fff',
              border: status === item.value ? '1px solid rgba(142,123,255,0.45)' : '1px solid rgba(255,255,255,0.12)',
            }}
          />
        ))}
      </Box>

      {error && <Typography sx={{ color: '#ff8a8a', fontSize: 14 }}>{error}</Typography>}
      {actionError && <Typography sx={{ color: '#ff8a8a', fontSize: 14 }}>{actionError}</Typography>}

      {reports.length === 0 ? (
        <Box sx={panelSx}>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Жалоб пока нет</Typography>
        </Box>
      ) : (
        reports.map((report) => (
          <Box key={report.id} sx={{ ...panelSx, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Chip
                label={report.status}
                size="small"
                sx={{ bgcolor: 'rgba(0,0,0,0.25)', color: statusColor(report.status) }}
              />
              <Chip
                label={reasonLabel(report.reason)}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)' }}
              />
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                #{report.id} · {new Date(report.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 14, color: '#fff' }}>
              {report.targetType === 'message' ? 'Сообщение' : 'Канал/пользователь'}:{' '}
              <Box component="span" sx={{ color: '#cfc5ff' }}>
                {report.targetNickname || report.targetUserId || '—'}
              </Box>
              {report.streamerNickname ? ` · канал ${report.streamerNickname}` : ''}
            </Typography>

            <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
              От: {report.reporterNickname || report.reporterUserId}
            </Typography>

            {report.messageSnapshot && (
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1,
                  bgcolor: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.85)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {report.messageSnapshot}
              </Box>
            )}

            {report.details && (
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                Комментарий: {report.details}
              </Typography>
            )}

            {report.linkedSanctionId && (
              <Typography sx={{ fontSize: 12, color: '#6fff79' }}>
                Связанная санкция #{report.linkedSanctionId}
              </Typography>
            )}

            {(report.status === 'new' || report.status === 'in_progress') && (
              <>
                <TextField
                  size="small"
                  label="Заметка резолюции"
                  value={notes[report.id] || ''}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [report.id]: e.target.value.slice(0, 500) }))}
                  sx={fieldSx}
                  fullWidth
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Button
                    size="small"
                    disabled={busyId === report.id}
                    onClick={() => runUpdate(report.id, { status: 'in_progress', assignToMe: true })}
                    sx={{ textTransform: 'none', color: '#fff' }}
                  >
                    В работу
                  </Button>
                  <Button
                    size="small"
                    disabled={busyId === report.id || !report.targetUserId}
                    onClick={() =>
                      runUpdate(report.id, {
                        status: 'resolved',
                        resolutionNote: notes[report.id] || 'Mute по жалобе',
                        assignToMe: true,
                        sanction: report.targetUserId
                          ? {
                              targetUserId: report.targetUserId,
                              type: 'chat_mute',
                              reason: notes[report.id] || `Mute по жалобе #${report.id}`,
                              durationMinutes: 60,
                            }
                          : undefined,
                      })
                    }
                    variant="contained"
                    sx={{ textTransform: 'none', bgcolor: '#6d5dfb', '&:hover': { bgcolor: '#8e7bff' } }}
                  >
                    Mute 1ч
                  </Button>
                  <Button
                    size="small"
                    disabled={busyId === report.id}
                    onClick={() =>
                      runUpdate(report.id, {
                        status: 'rejected',
                        resolutionNote: notes[report.id] || 'Отклонено',
                        assignToMe: true,
                      })
                    }
                    sx={{ textTransform: 'none', color: '#ff8a8a' }}
                  >
                    Отклонить
                  </Button>
                </Box>
              </>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

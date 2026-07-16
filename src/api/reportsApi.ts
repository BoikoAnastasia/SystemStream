import { getCookie } from '../utils/cookieFunctions';
import { handleApiRequest } from '../utils/handleApiRequest';

export type ReportTargetType = 'user' | 'message' | 'channel' | 'stream';
export type ReportReason = 'spam' | 'harassment' | 'hate' | 'illegal' | 'other';
export type ReportStatus = 'new' | 'in_progress' | 'resolved' | 'rejected';

export type PlatformReport = {
  id: number;
  reporterUserId: number;
  reporterNickname?: string | null;
  targetType: ReportTargetType | string;
  targetUserId?: number | null;
  targetNickname?: string | null;
  messageId?: string | null;
  messageSnapshot?: string | null;
  streamerId?: number | null;
  streamerNickname?: string | null;
  streamId?: number | null;
  reason: ReportReason | string;
  details?: string | null;
  status: ReportStatus | string;
  assigneeUserId?: number | null;
  assigneeNickname?: string | null;
  resolutionNote?: string | null;
  linkedSanctionId?: number | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string | null;
};

export type CreateReportPayload = {
  targetType: ReportTargetType;
  targetUserId?: number;
  messageId?: string;
  messageSnapshot?: string;
  streamerId?: number;
  streamId?: number;
  reason: ReportReason;
  details?: string;
};

export const REPORT_REASON_OPTIONS: { value: ReportReason; label: string }[] = [
  { value: 'spam', label: 'Спам' },
  { value: 'harassment', label: 'Оскорбления / травля' },
  { value: 'hate', label: 'Разжигание ненависти' },
  { value: 'illegal', label: 'Незаконный контент' },
  { value: 'other', label: 'Другое' },
];

const apiLocal = () => process.env.REACT_APP_API_LOCAL;

const authHeaders = () => {
  const token = getCookie('tokenData');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const normalizeReport = (raw: Record<string, unknown>): PlatformReport => ({
  id: Number(raw.id ?? raw.Id ?? 0),
  reporterUserId: Number(raw.reporterUserId ?? raw.ReporterUserId ?? 0),
  reporterNickname: (raw.reporterNickname ?? raw.ReporterNickname ?? null) as string | null,
  targetType: String(raw.targetType ?? raw.TargetType ?? ''),
  targetUserId: (raw.targetUserId ?? raw.TargetUserId ?? null) as number | null,
  targetNickname: (raw.targetNickname ?? raw.TargetNickname ?? null) as string | null,
  messageId: (raw.messageId ?? raw.MessageId ?? null) as string | null,
  messageSnapshot: (raw.messageSnapshot ?? raw.MessageSnapshot ?? null) as string | null,
  streamerId: (raw.streamerId ?? raw.StreamerId ?? null) as number | null,
  streamerNickname: (raw.streamerNickname ?? raw.StreamerNickname ?? null) as string | null,
  streamId: (raw.streamId ?? raw.StreamId ?? null) as number | null,
  reason: String(raw.reason ?? raw.Reason ?? ''),
  details: (raw.details ?? raw.Details ?? null) as string | null,
  status: String(raw.status ?? raw.Status ?? ''),
  assigneeUserId: (raw.assigneeUserId ?? raw.AssigneeUserId ?? null) as number | null,
  assigneeNickname: (raw.assigneeNickname ?? raw.AssigneeNickname ?? null) as string | null,
  resolutionNote: (raw.resolutionNote ?? raw.ResolutionNote ?? null) as string | null,
  linkedSanctionId: (raw.linkedSanctionId ?? raw.LinkedSanctionId ?? null) as number | null,
  createdAt: String(raw.createdAt ?? raw.CreatedAt ?? ''),
  updatedAt: String(raw.updatedAt ?? raw.UpdatedAt ?? ''),
  resolvedAt: (raw.resolvedAt ?? raw.ResolvedAt ?? null) as string | null,
});

export const createPlatformReport = async (payload: CreateReportPayload) => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiLocal()}/api/reports`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return { success: true as const, report: normalizeReport(result.data) };
};

export const fetchStaffMe = async () => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiLocal()}/api/staff/me`, {
    headers: authHeaders(),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  const permissions = (result.data.permissions ?? result.data.Permissions ?? {}) as Record<string, unknown>;
  return {
    success: true as const,
    userId: Number(result.data.userId ?? result.data.UserId ?? 0),
    nickname: String(result.data.nickname ?? result.data.Nickname ?? ''),
    role: String(result.data.role ?? result.data.Role ?? ''),
    permissions: {
      canAccessStaffPanel: Boolean(permissions.canAccessStaffPanel ?? permissions.CanAccessStaffPanel),
      canManageTickets: Boolean(permissions.canManageTickets ?? permissions.CanManageTickets),
      canModeratePlatform: Boolean(permissions.canModeratePlatform ?? permissions.CanModeratePlatform),
      canManageStaffRoles: Boolean(permissions.canManageStaffRoles ?? permissions.CanManageStaffRoles),
    },
  };
};

export const fetchStaffReports = async (status = 'new', take = 50) => {
  const qs = new URLSearchParams({ take: String(take) });
  if (status) qs.set('status', status);
  const result = await handleApiRequest<Record<string, unknown>[]>(`${apiLocal()}/api/staff/reports?${qs}`, {
    headers: authHeaders(),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  const rows = Array.isArray(result.data) ? result.data : [];
  return { success: true as const, reports: rows.map(normalizeReport) };
};

export const updateStaffReport = async (
  id: number,
  payload: {
    status?: ReportStatus;
    resolutionNote?: string;
    assignToMe?: boolean;
    sanction?: {
      targetUserId: number;
      type: string;
      reason: string;
      durationMinutes?: number | null;
    };
  }
) => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiLocal()}/api/staff/reports/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return { success: true as const, report: normalizeReport(result.data) };
};

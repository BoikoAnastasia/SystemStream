import { getCookie } from '../utils/cookieFunctions';
import { handleApiRequest } from '../utils/handleApiRequest';

const apiLocal = () => process.env.REACT_APP_API_LOCAL;

const authHeaders = () => {
  const token = getCookie('tokenData');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export type MySanction = {
  id: number;
  type: string;
  status: string;
  reason: string;
  createdAt: string;
  expiresAt?: string | null;
};

export type PlatformAppeal = {
  id: number;
  sanctionId: number;
  sanctionType: string;
  sanctionStatus: string;
  sanctionReason: string;
  sanctionExpiresAt?: string | null;
  userId: number;
  userNickname?: string | null;
  message: string;
  status: string;
  staffNote?: string | null;
  reviewedByNickname?: string | null;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string | null;
};

export type StaffQueueStats = {
  reportsNew: number;
  reportsInProgress: number;
  ticketsOpen: number;
  ticketsInProgress: number;
  ticketsWaitingUser: number;
  appealsOpen: number;
  activeSanctions: number;
  staleReports: number;
  staleTickets: number;
};

const normalizeSanction = (raw: Record<string, unknown>): MySanction => ({
  id: Number(raw.id ?? raw.Id ?? 0),
  type: String(raw.type ?? raw.Type ?? ''),
  status: String(raw.status ?? raw.Status ?? ''),
  reason: String(raw.reason ?? raw.Reason ?? ''),
  createdAt: String(raw.createdAt ?? raw.CreatedAt ?? ''),
  expiresAt: (raw.expiresAt ?? raw.ExpiresAt ?? null) as string | null,
});

const normalizeAppeal = (raw: Record<string, unknown>): PlatformAppeal => ({
  id: Number(raw.id ?? raw.Id ?? 0),
  sanctionId: Number(raw.sanctionId ?? raw.SanctionId ?? 0),
  sanctionType: String(raw.sanctionType ?? raw.SanctionType ?? ''),
  sanctionStatus: String(raw.sanctionStatus ?? raw.SanctionStatus ?? ''),
  sanctionReason: String(raw.sanctionReason ?? raw.SanctionReason ?? ''),
  sanctionExpiresAt: (raw.sanctionExpiresAt ?? raw.SanctionExpiresAt ?? null) as string | null,
  userId: Number(raw.userId ?? raw.UserId ?? 0),
  userNickname: (raw.userNickname ?? raw.UserNickname ?? null) as string | null,
  message: String(raw.message ?? raw.Message ?? ''),
  status: String(raw.status ?? raw.Status ?? ''),
  staffNote: (raw.staffNote ?? raw.StaffNote ?? null) as string | null,
  reviewedByNickname: (raw.reviewedByNickname ?? raw.ReviewedByNickname ?? null) as string | null,
  createdAt: String(raw.createdAt ?? raw.CreatedAt ?? ''),
  updatedAt: String(raw.updatedAt ?? raw.UpdatedAt ?? ''),
  resolvedAt: (raw.resolvedAt ?? raw.ResolvedAt ?? null) as string | null,
});

const normalizeStats = (raw: Record<string, unknown>): StaffQueueStats => ({
  reportsNew: Number(raw.reportsNew ?? raw.ReportsNew ?? 0),
  reportsInProgress: Number(raw.reportsInProgress ?? raw.ReportsInProgress ?? 0),
  ticketsOpen: Number(raw.ticketsOpen ?? raw.TicketsOpen ?? 0),
  ticketsInProgress: Number(raw.ticketsInProgress ?? raw.TicketsInProgress ?? 0),
  ticketsWaitingUser: Number(raw.ticketsWaitingUser ?? raw.TicketsWaitingUser ?? 0),
  appealsOpen: Number(raw.appealsOpen ?? raw.AppealsOpen ?? 0),
  activeSanctions: Number(raw.activeSanctions ?? raw.ActiveSanctions ?? 0),
  staleReports: Number(raw.staleReports ?? raw.StaleReports ?? 0),
  staleTickets: Number(raw.staleTickets ?? raw.StaleTickets ?? 0),
});

export const fetchMySanctions = async (activeOnly = false) => {
  const qs = new URLSearchParams({ activeOnly: String(activeOnly) });
  const result = await handleApiRequest<Record<string, unknown>[]>(`${apiLocal()}/api/me/sanctions?${qs}`, {
    headers: authHeaders(),
  });
  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }
  const rows = Array.isArray(result.data) ? result.data : [];
  return { success: true as const, sanctions: rows.map(normalizeSanction) };
};

export const fetchMyAppeals = async () => {
  const result = await handleApiRequest<Record<string, unknown>[]>(`${apiLocal()}/api/me/appeals`, {
    headers: authHeaders(),
  });
  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }
  const rows = Array.isArray(result.data) ? result.data : [];
  return { success: true as const, appeals: rows.map(normalizeAppeal) };
};

export const createMyAppeal = async (sanctionId: number, message: string) => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiLocal()}/api/me/appeals`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ sanctionId, message }),
  });
  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }
  return { success: true as const, appeal: normalizeAppeal(result.data) };
};

export const fetchStaffAppeals = async (status = 'open', take = 50) => {
  const qs = new URLSearchParams({ take: String(take) });
  if (status) qs.set('status', status);
  const result = await handleApiRequest<Record<string, unknown>[]>(`${apiLocal()}/api/staff/appeals?${qs}`, {
    headers: authHeaders(),
  });
  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }
  const rows = Array.isArray(result.data) ? result.data : [];
  return { success: true as const, appeals: rows.map(normalizeAppeal) };
};

export const updateStaffAppeal = async (
  id: number,
  payload: { status?: string; staffNote?: string; revokeSanction?: boolean }
) => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiLocal()}/api/staff/appeals/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }
  return { success: true as const, appeal: normalizeAppeal(result.data) };
};

export const fetchStaffStats = async () => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiLocal()}/api/staff/stats`, {
    headers: authHeaders(),
  });
  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }
  return { success: true as const, stats: normalizeStats(result.data) };
};

export const sanctionTypeLabel = (type: string) => {
  const map: Record<string, string> = {
    warning: 'Предупреждение',
    chat_mute: 'Мут чата',
    stream_ban: 'Бан стрима',
    login_ban: 'Бан входа',
    full_ban: 'Полный бан',
  };
  return map[type] || type;
};

export const sanctionStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    active: 'Активно',
    expired: 'Истекло',
    revoked: 'Снято',
  };
  return map[status] || status;
};

export const appealStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    open: 'Ждёт ответа',
    in_review: 'Смотрят',
    approved: 'Одобрена (сняли)',
    rejected: 'Отклонена',
  };
  return map[status] || status;
};

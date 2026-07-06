import { getCookie } from '../utils/cookieFunctions';
import { handleApiRequest } from '../utils/handleApiRequest';
import { fetchStreamTeamAccess } from './streamTeamApi';

export type StreamChatSettings = {
  slowModeSeconds: number;
  chatRules: string;
};

export type StreamChatModerationLogEntry = {
  id: number;
  actorUserId: number;
  actorUsername: string;
  action: string;
  targetUserId?: number | null;
  targetUsername?: string | null;
  messageId?: string | null;
  details?: string | null;
  createdAt: string;
};

const apiBase = () => `${process.env.REACT_APP_API_LOCAL}/api/streamers`;

const authHeaders = () => {
  const token = getCookie('tokenData');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const normalizeSettings = (raw: Record<string, unknown>): StreamChatSettings => ({
  slowModeSeconds: Number(raw.slowModeSeconds ?? raw.SlowModeSeconds ?? 0),
  chatRules: String(raw.chatRules ?? raw.ChatRules ?? ''),
});

const normalizeLogEntry = (raw: Record<string, unknown>): StreamChatModerationLogEntry => ({
  id: Number(raw.id ?? raw.Id ?? 0),
  actorUserId: Number(raw.actorUserId ?? raw.ActorUserId ?? 0),
  actorUsername: String(raw.actorUsername ?? raw.ActorUsername ?? ''),
  action: String(raw.action ?? raw.Action ?? ''),
  targetUserId: (raw.targetUserId ?? raw.TargetUserId ?? null) as number | null,
  targetUsername: (raw.targetUsername ?? raw.TargetUsername ?? null) as string | null,
  messageId: (raw.messageId ?? raw.MessageId ?? null) as string | null,
  details: (raw.details ?? raw.Details ?? null) as string | null,
  createdAt: String(raw.createdAt ?? raw.CreatedAt ?? ''),
});

export const resolveStreamerId = async (channelNickname: string, mode: 'own' | 'delegated', profileId?: number) => {
  if (mode === 'own' && profileId) return profileId;

  const accessResult = await fetchStreamTeamAccess(channelNickname);
  return accessResult.access?.streamerId;
};

export const fetchStreamChatSettings = async (streamerId: number) => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiBase()}/${streamerId}/chat/settings`, {
    headers: authHeaders(),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return { success: true as const, settings: normalizeSettings(result.data) };
};

export const updateStreamChatSettings = async (streamerId: number, payload: Partial<StreamChatSettings>) => {
  const result = await handleApiRequest<Record<string, unknown>>(`${apiBase()}/${streamerId}/chat/settings`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({
      slowModeSeconds: payload.slowModeSeconds,
      chatRules: payload.chatRules,
    }),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return { success: true as const, settings: normalizeSettings(result.data) };
};

export const fetchStreamModerationLog = async (streamerId: number, page = 1) => {
  const result = await handleApiRequest<{
    items: Record<string, unknown>[];
    total: number;
  }>(`${apiBase()}/${streamerId}/chat/modlog?page=${page}&pageSize=30`, {
    headers: authHeaders(),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return {
    success: true as const,
    items: (result.data.items ?? []).map(normalizeLogEntry),
    total: Number(result.data.total ?? 0),
  };
};

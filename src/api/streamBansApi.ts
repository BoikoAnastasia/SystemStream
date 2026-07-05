import { getCookie } from '../utils/cookieFunctions';
import { handleApiRequest } from '../utils/handleApiRequest';

export type StreamChatBan = {
  userId: number;
  username: string;
  profileImage?: string | null;
  bannedAt: string;
};

const bansApiBase = () => `${process.env.REACT_APP_API_LOCAL}/api/streamers`;

const authHeaders = () => {
  const token = getCookie('tokenData');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const normalizeBan = (raw: Record<string, unknown>): StreamChatBan => ({
  userId: Number(raw.userId ?? raw.UserId ?? 0),
  username: String(raw.username ?? raw.Username ?? ''),
  profileImage: (raw.profileImage ?? raw.ProfileImage ?? null) as string | null,
  bannedAt: String(raw.bannedAt ?? raw.BannedAt ?? ''),
});

export const fetchStreamBans = async (streamerId: number) => {
  const result = await handleApiRequest<{ bans: Record<string, unknown>[] }>(`${bansApiBase()}/${streamerId}/bans`, {
    headers: authHeaders(),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return {
    success: true as const,
    bans: (result.data.bans ?? []).map(normalizeBan),
  };
};

export const unbanStreamUser = async (streamerId: number, userId: number) => {
  const result = await handleApiRequest<{ bans: Record<string, unknown>[] }>(
    `${bansApiBase()}/${streamerId}/bans/${userId}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
    }
  );

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return {
    success: true as const,
    bans: (result.data.bans ?? []).map(normalizeBan),
  };
};

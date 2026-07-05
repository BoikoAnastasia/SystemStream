import { getCookie } from '../utils/cookieFunctions';
import { handleApiRequest } from '../utils/handleApiRequest';

export type StreamTeamRole = 'Moderator' | 'Assistant';

export type StreamTeamMember = {
  userId: number;
  nickname: string;
  profileImage?: string | null;
  role: StreamTeamRole;
};

export type StreamTeamAccess = {
  streamerId: number;
  streamerNickname: string;
  role?: string | null;
  canManageStream: boolean;
  canManageChat: boolean;
  canManageTeam: boolean;
  canAssignModerators: boolean;
  canAssignAssistants: boolean;
};

const teamApiBase = () => `${process.env.REACT_APP_API_LOCAL}/api/streamers`;

const authHeaders = () => {
  const token = getCookie('tokenData');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const normalizeMember = (raw: Record<string, unknown>): StreamTeamMember => ({
  userId: Number(raw.userId ?? raw.UserId ?? 0),
  nickname: String(raw.nickname ?? raw.Nickname ?? ''),
  profileImage: (raw.profileImage ?? raw.ProfileImage ?? null) as string | null,
  role: String(raw.role ?? raw.Role ?? 'Moderator') as StreamTeamRole,
});

const normalizeAccess = (raw: Record<string, unknown>): StreamTeamAccess => ({
  streamerId: Number(raw.streamerId ?? raw.StreamerId ?? 0),
  streamerNickname: String(raw.streamerNickname ?? raw.StreamerNickname ?? ''),
  role: (raw.role ?? raw.Role ?? null) as string | null,
  canManageStream: Boolean(raw.canManageStream ?? raw.CanManageStream),
  canManageChat: Boolean(raw.canManageChat ?? raw.CanManageChat),
  canManageTeam: Boolean(raw.canManageTeam ?? raw.CanManageTeam),
  canAssignModerators: Boolean(raw.canAssignModerators ?? raw.CanAssignModerators),
  canAssignAssistants: Boolean(raw.canAssignAssistants ?? raw.CanAssignAssistants),
});

export const fetchStreamTeam = async (streamerId: number) => {
  const result = await handleApiRequest<{ members: Record<string, unknown>[]; access: Record<string, unknown> }>(
    `${teamApiBase()}/${streamerId}/team`,
    { headers: authHeaders() }
  );

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return {
    success: true as const,
    members: (result.data.members ?? []).map(normalizeMember),
    access: normalizeAccess(result.data.access ?? {}),
  };
};

export const fetchStreamTeamAccess = async (nickname: string) => {
  const result = await handleApiRequest<Record<string, unknown>>(
    `${teamApiBase()}/by-nickname/${encodeURIComponent(nickname)}/team/access`,
    { headers: authHeaders() }
  );

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message, access: null };
  }

  const role = result.data.role ?? result.data.Role;
  if (!role) {
    return { success: true as const, access: null };
  }

  return { success: true as const, access: normalizeAccess(result.data) };
};

export const addStreamTeamMember = async (streamerId: number, nickname: string, role: StreamTeamRole) => {
  const result = await handleApiRequest<{ members: Record<string, unknown>[] }>(`${teamApiBase()}/${streamerId}/team`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ nickname, role }),
  });

  if (!result.success || !result.data) {
    return { success: false as const, message: result.message };
  }

  return {
    success: true as const,
    members: (result.data.members ?? []).map(normalizeMember),
  };
};

export const removeStreamTeamMember = async (streamerId: number, memberUserId: number) => {
  const result = await handleApiRequest<{ members: Record<string, unknown>[] }>(
    `${teamApiBase()}/${streamerId}/team/${memberUserId}`,
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
    members: (result.data.members ?? []).map(normalizeMember),
  };
};

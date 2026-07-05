import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from './redux';
import {
  addStreamTeamMember,
  fetchStreamTeam,
  fetchStreamTeamAccess,
  removeStreamTeamMember,
  StreamTeamAccess,
  StreamTeamMember,
  StreamTeamRole,
} from '../api/streamTeamApi';

export const useStreamTeam = (channelNickname: string, mode: 'own' | 'delegated') => {
  const { data: profile } = useAppSelector((state) => state.user);
  const [members, setMembers] = useState<StreamTeamMember[]>([]);
  const [access, setAccess] = useState<StreamTeamAccess | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const streamerId = mode === 'own' ? profile?.id : access?.streamerId;

  const load = useCallback(async () => {
    if (!profile?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'own') {
        const result = await fetchStreamTeam(profile.id);
        if (!result.success) {
          setError(result.message);
          setMembers([]);
          return;
        }
        setMembers(result.members);
        setAccess(result.access);
        return;
      }

      const accessResult = await fetchStreamTeamAccess(channelNickname);
      if (!accessResult.success) {
        setError(accessResult.message);
        setAccess(null);
        setMembers([]);
        return;
      }

      setAccess(accessResult.access);

      if (!accessResult.access?.canManageTeam) {
        setMembers([]);
        return;
      }

      const teamResult = await fetchStreamTeam(accessResult.access.streamerId);
      if (!teamResult.success) {
        setError(teamResult.message);
        setMembers([]);
        return;
      }

      setMembers(teamResult.members);
      setAccess(teamResult.access);
    } finally {
      setIsLoading(false);
    }
  }, [profile?.id, mode, channelNickname]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const handleTeamMemberRemoved = (event: Event) => {
      const userId = Number((event as CustomEvent<{ userId: number }>).detail?.userId ?? 0);
      if (!userId) return;
      setMembers((prev) => prev.filter((member) => member.userId !== userId));
    };

    window.addEventListener('stream-team-member-removed', handleTeamMemberRemoved);
    return () => window.removeEventListener('stream-team-member-removed', handleTeamMemberRemoved);
  }, []);

  const addMember = useCallback(
    async (nickname: string, role: StreamTeamRole) => {
      if (!streamerId) return false;

      setActionError(null);
      const result = await addStreamTeamMember(streamerId, nickname, role);
      if (!result.success) {
        setActionError(result.message);
        return false;
      }

      setMembers(result.members);
      return true;
    },
    [streamerId]
  );

  const removeMember = useCallback(
    async (memberUserId: number) => {
      if (!streamerId) return false;

      setActionError(null);
      const result = await removeStreamTeamMember(streamerId, memberUserId);
      if (!result.success) {
        setActionError(result.message);
        return false;
      }

      setMembers(result.members);
      return true;
    },
    [streamerId]
  );

  return {
    members,
    access,
    isLoading,
    error,
    actionError,
    addMember,
    removeMember,
    reload: load,
  };
};

export const useStreamTeamAccess = (channelNickname: string) => {
  const [access, setAccess] = useState<StreamTeamAccess | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(channelNickname));

  useEffect(() => {
    if (!channelNickname) {
      setAccess(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      const result = await fetchStreamTeamAccess(channelNickname);
      if (!cancelled) {
        setAccess(result.success ? result.access : null);
        setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [channelNickname]);

  return { access, isLoading };
};

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from './redux';
import { fetchStreamTeamAccess } from '../api/streamTeamApi';
import { fetchStreamBans, StreamChatBan, unbanStreamUser } from '../api/streamBansApi';

export const useStreamBans = (channelNickname: string, mode: 'own' | 'delegated') => {
  const { data: profile } = useAppSelector((state) => state.user);
  const [bans, setBans] = useState<StreamChatBan[]>([]);
  const [canManageChat, setCanManageChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const delegatedStreamerIdRef = useRef<number | undefined>(undefined);

  const load = useCallback(async () => {
    if (!profile?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'own') {
        const result = await fetchStreamBans(profile.id);
        if (!result.success) {
          setError(result.message);
          setBans([]);
          setCanManageChat(false);
          return;
        }
        setBans(result.bans);
        setCanManageChat(true);
        return;
      }

      const accessResult = await fetchStreamTeamAccess(channelNickname);
      if (!accessResult.success) {
        setError(accessResult.message);
        setBans([]);
        setCanManageChat(false);
        return;
      }

      const canManage = Boolean(accessResult.access?.canManageChat);
      setCanManageChat(canManage);

      if (!canManage || !accessResult.access?.streamerId) {
        setBans([]);
        delegatedStreamerIdRef.current = undefined;
        return;
      }

      delegatedStreamerIdRef.current = accessResult.access.streamerId;

      const bansResult = await fetchStreamBans(accessResult.access.streamerId);
      if (!bansResult.success) {
        setError(bansResult.message);
        setBans([]);
        return;
      }

      setBans(bansResult.bans);
    } finally {
      setIsLoading(false);
    }
  }, [profile?.id, mode, channelNickname]);

  useEffect(() => {
    load();
  }, [load]);

  const unban = useCallback(
    async (userId: number) => {
      const targetStreamerId = mode === 'own' ? profile?.id : delegatedStreamerIdRef.current;

      if (!targetStreamerId) return false;

      setActionError(null);
      const result = await unbanStreamUser(targetStreamerId, userId);
      if (!result.success) {
        setActionError(result.message);
        return false;
      }

      setBans(result.bans);
      return true;
    },
    [mode, profile?.id]
  );

  return {
    bans,
    canManageChat,
    isLoading,
    error,
    actionError,
    unban,
    reload: load,
  };
};

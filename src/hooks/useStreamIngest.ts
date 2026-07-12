import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { useAppSelector } from './redux';
import { fetchStreamKey } from '../store/actions/StreamActions';
import { postStreamKey } from '../store/actions/SettingsActions';
import { getRtmpServerUrl } from '../utils/getRtmpServerUrl';

/** Stream ingest credentials — only for the channel owner (never moderators). */
export const useStreamIngest = (enabled: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError, isLoading } = useAppSelector((state) => state.settings);
  const [showKey, setShowKey] = useState(false);

  const loadKey = useCallback(() => {
    if (!enabled) return;
    dispatch(fetchStreamKey());
  }, [dispatch, enabled]);

  useEffect(() => {
    if (!enabled || data?.streamKey) return;
    loadKey();
  }, [enabled, data?.streamKey, loadKey]);

  const regenerateKey = useCallback(() => {
    if (!enabled) return;
    dispatch(postStreamKey());
  }, [dispatch, enabled]);

  return {
    streamKey: data?.streamKey ?? '',
    rtmpUrl: getRtmpServerUrl(),
    showKey,
    setShowKey,
    isError: isError ? String(isError) : null,
    isLoading,
    loadKey,
    regenerateKey,
  };
};

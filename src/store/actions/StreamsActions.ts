import { AppDispatch, RootState } from '../store';
import { StreamsSliceFetch, StreamsSliceFetchError, StreamsSliceFetchSuccess } from '../slices/StreamsSlice';
import { createSelector } from '@reduxjs/toolkit';
import {
  StreamsHistoryFetch,
  StreamsHistoryFetchError,
  StreamsHistoryFetchSuccess,
} from '../slices/StreamsHistorySlice';
import { sanitizeStreamersLeague } from '../../utils/streamersLeague';
import { SIDEBAR_LIVE_FETCH_PAGE_SIZE } from '../../components/sidebar/sidebar.constants';
import { ISubscriber } from '../../types/share';
import { fetchLiveStreamsFromApi } from '../../api/liveStreamsApi';

export { normalizeOnlineUser } from '../../api/liveStreamsApi';

export const normalizeSubscriber = (raw: Record<string, unknown>): ISubscriber => ({
  nickname: String(raw.nickname ?? raw.Nickname ?? ''),
  profileImage: String(raw.profileImage ?? raw.ProfileImage ?? ''),
  isOnline: Boolean(raw.isOnline ?? raw.IsOnline ?? false),
  streamersLeague: sanitizeStreamersLeague(String(raw.streamersLeague ?? raw.StreamersLeague ?? '')),
  previewUrl: String(raw.previewUrl ?? raw.PreviewUrl ?? ''),
  streamName: String(raw.streamName ?? raw.StreamName ?? ''),
});

type FetchStreamsOptions = {
  silent?: boolean;
};

export const fetchUserOnlineStreams =
  (page = 1, pageSize = SIDEBAR_LIVE_FETCH_PAGE_SIZE, options: FetchStreamsOptions = {}) =>
  async (dispatch: AppDispatch) => {
    const { silent = false } = options;

    if (!silent) {
      dispatch(StreamsSliceFetch());
    }

    const { data, error } = await fetchLiveStreamsFromApi(page, pageSize);

    if (error || !data) {
      if (!silent) {
        dispatch(StreamsSliceFetchError(error || 'Не удалось получить стримы'));
      }
      return;
    }

    dispatch(StreamsSliceFetchSuccess(data));
  };

export const fecthStreamHistory =
  (nickname: string | undefined, page = 1, pageSize = 25) =>
  async (dispatch: AppDispatch) => {
    if (nickname === undefined) return;
    try {
      dispatch(StreamsHistoryFetch());
      const response = await fetch(
        `${process.env.REACT_APP_API_USER}/${nickname}/streams/history?page=${page}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message =
          typeof errorData?.message === 'string' ? errorData.message : 'Не удалось получить историю стримов';
        dispatch(StreamsHistoryFetchError(message));
        return;
      }
      const data = await response.json();
      dispatch(StreamsHistoryFetchSuccess({ data, nickname }));
    } catch (error) {
      console.log('Не получилось получить историю стримов пользователя');
      dispatch(
        StreamsHistoryFetchError(error instanceof Error ? error.message : 'Не удалось получить историю стримов')
      );
    }
  };

export const selectStreamsData = (state: RootState) => state.streams.data;

export const selectStreams = createSelector([selectStreamsData], (data) => data?.streams ?? []);

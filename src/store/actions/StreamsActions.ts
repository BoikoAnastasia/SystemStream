import { AppDispatch, RootState } from '../store';
import { StreamsSliceFetch, StreamsSliceFetchError, StreamsSliceFetchSuccess } from '../slices/StreamsSlice';
import { createGuestKey } from '../../utils/createGuestKey';
import { createSelector } from '@reduxjs/toolkit';
import {
  StreamsHistoryFetch,
  StreamsHistoryFetchError,
  StreamsHistoryFetchSuccess,
} from '../slices/StreamsHistorySlice';
import { sanitizeStreamersLeague } from '../../utils/streamersLeague';
import { SIDEBAR_LIVE_FETCH_PAGE_SIZE } from '../../components/sidebar/sidebar.constants';
import { IStreamsData, IStreamOnline, ISubscriber } from '../../types/share';

const normalizeOnlineUser = (raw: Record<string, unknown>): IStreamOnline => ({
  nickname: String(raw.nickname ?? raw.Nickname ?? ''),
  profileImage: String(raw.profileImage ?? raw.ProfileImage ?? ''),
  isOnline: Boolean(raw.isOnline ?? raw.IsOnline ?? false),
  streamersLeague: sanitizeStreamersLeague(String(raw.streamersLeague ?? raw.StreamersLeague ?? '')),
  previewUrl: String(raw.previewUrl ?? raw.PreviewUrl ?? ''),
  streamName: String(raw.streamName ?? raw.StreamName ?? ''),
  streamId: (raw.streamId ?? raw.StreamId ?? null) as number | null,
});

export const normalizeSubscriber = (raw: Record<string, unknown>): ISubscriber => ({
  nickname: String(raw.nickname ?? raw.Nickname ?? ''),
  profileImage: String(raw.profileImage ?? raw.ProfileImage ?? ''),
  isOnline: Boolean(raw.isOnline ?? raw.IsOnline ?? false),
  streamersLeague: sanitizeStreamersLeague(String(raw.streamersLeague ?? raw.StreamersLeague ?? '')),
  previewUrl: String(raw.previewUrl ?? raw.PreviewUrl ?? ''),
  streamName: String(raw.streamName ?? raw.StreamName ?? ''),
});

export const fetchUserOnlineStreams =
  (page = 1, pageSize = SIDEBAR_LIVE_FETCH_PAGE_SIZE) =>
  async (dispatch: AppDispatch) => {
    const token = createGuestKey();
    try {
      dispatch(StreamsSliceFetch());
      const response = await fetch(
        `${process.env.REACT_APP_API_USER}/online/streams?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        dispatch(StreamsSliceFetchError(errorData.message || 'Не удалось получить стримы'));
        return;
      }
      const data = await response.json();
      const rawStreams = data.streams ?? data.Streams ?? [];
      const mappedData: IStreamsData = {
        totalStreams: data.totalStreams ?? data.TotalStreams ?? rawStreams.length,
        page: data.page ?? data.Page ?? page,
        pageSize: data.pageSize ?? data.PageSize ?? pageSize,
        streams: rawStreams.map((s: Record<string, unknown>) => normalizeOnlineUser(s)),
      };
      dispatch(StreamsSliceFetchSuccess(mappedData));
    } catch (error) {
      console.log('Не получилось получить онлайн стримы пользователя');
      dispatch(StreamsSliceFetchError(error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
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

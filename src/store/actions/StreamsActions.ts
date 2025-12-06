import { AppDispatch, RootState } from '../store';
import { StreamsSliceFetch, StreamsSliceFetchError, StreamsSliceFetchSuccess } from '../slices/StreamsSlice';
import { createGuestKey } from '../../utils/createGuestKey';
import { createSelector } from '@reduxjs/toolkit';
import {
  StreamsHistoryFetch,
  StreamsHistoryFetchError,
  StreamsHistoryFetchSuccess,
} from '../slices/StreamsHistorySlice';
import { IStreamsData } from '../../types/share';

export const fetchUserOnlineStreams =
  (page = 1, pageSize = 25) =>
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
      const mappedData: IStreamsData = {
        ...data,
        streams: data.streams.map((s: any) => ({
          ...s,
          previewUrl: s.previewUrl ?? '',
          streamId: s.streamId ?? null,
        })),
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
        const errorData = await response.json();
        dispatch(StreamsHistoryFetchError(errorData));
        return;
      }
      const data = await response.json();
      dispatch(StreamsHistoryFetchSuccess({ data, nickname }));
    } catch (error) {
      console.log('Не получилось получить историю стримов пользователя');
      dispatch(StreamsHistoryFetchError(error));
    }
  };

export const selectStreamsData = (state: RootState) => state.streams.data;

export const selectStreams = createSelector([selectStreamsData], (data) => data?.streams ?? []);

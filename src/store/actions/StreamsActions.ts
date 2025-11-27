import { AppDispatch, RootState } from '../store';
import { StreamsSliceFetch, StreamsSliceFetchError, StreamsSliceFetchSuccess } from '../slices/StreamsSlice';
import { createGuestKey } from '../../utils/createGuestKey';
import { createSelector } from '@reduxjs/toolkit';
import { StreamsHistoryFetch, StreamsHistoryFetchError } from '../slices/StreamsHistorySlice';

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
        console.log('errorData: ', errorData);
        dispatch(StreamsSliceFetchError(errorData));
      }
      const data = await response.json();
      dispatch(StreamsSliceFetchSuccess(data));
    } catch (error) {
      console.log('Не получилось получить онлайн стримы пользователя');
      dispatch(StreamsSliceFetchError(error));
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
        console.log('errorData: ', errorData);
      }
      const data = await response.json();
      console.log(data);
      dispatch(StreamsSliceFetchSuccess(data));
    } catch (error) {
      console.log('Не получилось получить историю стримов пользователя');
      dispatch(StreamsHistoryFetchError(error));
    }
  };

export const selectStreamsData = (state: RootState) => state.streams?.data?.streams;

export const selectStreams = createSelector([selectStreamsData], (streams) => streams ?? []);

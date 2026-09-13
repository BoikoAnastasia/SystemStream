import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStreamHistoryData, IStreamsHistorySlice } from '../../types/share';

const initialState: IStreamsHistorySlice = {
  data: null,
  isError: false,
  isLoading: false,
  lastNickname: null,
};

export const StreamsHistorySlice = createSlice({
  name: 'userStreams',
  initialState,
  reducers: {
    StreamsHistoryFetch: (state) => {
      state.isError = null;
      state.isLoading = true;
    },
    StreamsHistoryFetchSuccess: (
      state,
      action: PayloadAction<{ data: IStreamHistoryData; nickname: string } | null | undefined>
    ) => {
      const payload = action.payload;
      const hasValidData = payload && payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data);
      const hasValidNickname = payload && typeof payload.nickname === 'string';
      if (!hasValidData || !hasValidNickname) {
        state.data = null;
        state.lastNickname = null;
        state.isError = null;
        state.isLoading = false;
        return;
      }

      state.data = payload.data;
      state.lastNickname = payload.nickname;
      state.isError = null;
      state.isLoading = false;
    },
    StreamsHistoryFetchError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    Clear(state) {
      state.data = null;
      state.isLoading = false;
      state.isError = null;
    },
  },
});

export const { Clear, StreamsHistoryFetch, StreamsHistoryFetchError, StreamsHistoryFetchSuccess } =
  StreamsHistorySlice.actions;

export default StreamsHistorySlice.reducer;

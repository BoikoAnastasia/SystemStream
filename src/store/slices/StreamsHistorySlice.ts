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
    StreamsHistoryFetchSuccess: (state, action: PayloadAction<IStreamHistoryData>) => {
      state.data = action.payload;
      state.lastNickname = action.payload.nickname;
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

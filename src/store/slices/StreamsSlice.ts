import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStreamsData, IStreamsSlice } from '../../types/share';

const initialState: IStreamsSlice = {
  data: {
    totalStreams: 1,
    page: 1,
    pageSize: 25,
    streams: [],
  },
  isError: false,
  isLoading: false,
};

export const StreamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    StreamsSliceFetch: (state) => {
      state.isError = null;
      state.isLoading = true;
    },
    StreamsSliceFetchSuccess: (state, action: PayloadAction<IStreamsData>) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    StreamsSliceFetchError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export const { StreamsSliceFetch, StreamsSliceFetchError, StreamsSliceFetchSuccess } = StreamsSlice.actions;
export default StreamsSlice.reducer;

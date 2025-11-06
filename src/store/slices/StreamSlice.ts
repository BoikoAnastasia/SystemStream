import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStream } from '../../types/share';

const initialState: any = {
  data: null,
  isError: false,
  isLoading: false,
};

export const StreamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    StreamSliceFetch: (state) => {
      state.isError = null;
      state.isLoading = true;
    },
    StreamSliceSuccess: (state, action: PayloadAction<IStream>) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    StreamSliceError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export default StreamSlice.reducer;

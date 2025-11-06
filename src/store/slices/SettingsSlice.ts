import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetting, ISettingsSlice } from '../../types/share';

const initialState: ISettingsSlice = {
  data: null,
  isError: false,
  isLoading: false,
};

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    SettingsSliceFetch: (state) => {
      state.isError = null;
      state.isLoading = true;
    },
    SettingsSliceSuccess: (state, action: PayloadAction<ISetting>) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    SettingsSliceError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export default SettingsSlice.reducer;

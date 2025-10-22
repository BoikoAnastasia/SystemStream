import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IUserProfile } from '../../types/share';

const initialState: IUserProfile = {
  data: null,
  isError: false,
  isLoading: false,
};

export const SelectUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    SelectUserFetch: (state) => {
      state.isError = null;
      state.isLoading = true;
    },
    SelectUserFetchSuccess: (state, action: PayloadAction<IProfile>) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    SelectUserFetchError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export default SelectUserSlice.reducer;

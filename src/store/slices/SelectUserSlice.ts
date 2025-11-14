import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IUserProfileSlice } from '../../types/share';

const initialState: IUserProfileSlice = {
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
    SelectUserError: (state, action) => {
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

export default SelectUserSlice.reducer;

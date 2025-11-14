import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, IUserProfileSlice } from '../../types/share';

const initialState: IUserProfileSlice = {
  data: null,
  isError: false,
  isLoading: false,
  isAuth: false,
};

export const UserProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UserFetch: (state) => {
      state.isError = null;
      state.isLoading = true;
    },
    UserLogout: (state) => {
      state.data = null;
      state.isError = false;
      state.isLoading = false;
      state.isAuth = false;
    },
    UserFetchSuccess: (state, action: PayloadAction<IProfile>) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
      state.isAuth = true;
    },
    UserFetchError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
      state.isAuth = false;
    },
    SetAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export default UserProfileSlice.reducer;

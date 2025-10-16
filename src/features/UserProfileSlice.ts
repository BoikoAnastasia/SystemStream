import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  data: any[] | null;
  isError: null | boolean | any;
  isLoading: boolean;
}

const initialState: UserProfile = {
  data: null,
  isError: false,
  isLoading: false,
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
    },
    UserFetchSuccess: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    UserFetchError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export default UserProfileSlice.reducer;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserProfileSlice } from './slices/UserProfileSlice';
import { SelectUserSlice } from './slices/SelectUserSlice';

const rootReducer = combineReducers({
  user: UserProfileSlice.reducer,
  selectUser: SelectUserSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

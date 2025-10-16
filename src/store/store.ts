import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserProfileSlice } from '../features/UserProfileSlice';

const rootReducer = combineReducers({
  user: UserProfileSlice.reducer,
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

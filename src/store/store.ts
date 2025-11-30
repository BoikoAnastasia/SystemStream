import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserProfileSlice } from './slices/UserProfileSlice';
import { SelectUserSlice } from './slices/SelectUserSlice';
import { SettingsSlice } from './slices/SettingsSlice';
import { StreamsSlice } from './slices/StreamsSlice';
import { NotificationSlice } from './slices/NotificationSlice';
import { StreamsHistorySlice } from './slices/StreamsHistorySlice';

const rootReducer = combineReducers({
  user: UserProfileSlice.reducer,
  selectUser: SelectUserSlice.reducer,
  settings: SettingsSlice.reducer,
  stream: StreamsSlice.reducer,
  notiications: NotificationSlice.reducer,
  streams: StreamsSlice.reducer,
  userStreams: StreamsHistorySlice.reducer,
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

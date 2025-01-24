import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { newsApi } from '@/shared/api/newsApi';
import { authSlice } from '@/entities/auth/model/slice';
import { userSlice } from '@/entities/user/model/slice';
import { persistMiddleware } from './middleware/persistMiddleware';

// Загружаем сохраненное состояние
const savedAuthState = localStorage.getItem('authState');
const savedUserState = localStorage.getItem('userState');

const preloadedState = {
  auth: savedAuthState ? JSON.parse(savedAuthState) : undefined,
  user: savedUserState ? JSON.parse(savedUserState) : undefined,
};

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(newsApi.middleware)
      .concat(persistMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
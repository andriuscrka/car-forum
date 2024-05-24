import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = {
  auth: ReturnType<typeof authSlice>;
}
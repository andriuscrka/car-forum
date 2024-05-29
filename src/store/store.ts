import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth/authSlice';
import postsSlice from './slices/posts/postsSlice';
import commentsSlice from './slices/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    comments: commentsSlice,
  },
});

export type RootState = {
  auth: ReturnType<typeof authSlice>;
  posts: ReturnType<typeof postsSlice>;
  comments: ReturnType<typeof commentsSlice>;
}
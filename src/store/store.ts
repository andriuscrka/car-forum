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
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

export type RootState = {
  auth: ReturnType<typeof authSlice>;
  posts: ReturnType<typeof postsSlice>;
  comments: ReturnType<typeof commentsSlice>;
}
'use strict';

import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import axios from 'axios';
import Routes from '../../../constants/routes';

const initialState = {
  status: 'idle',
  error: null,
  post: {},
  posts: [],
  postPreviews: []
};

export const addPost = createAsyncThunk('posts/addPost', async (post: any, thunkAPI) => {
  try {
    const response = await axios.post(Routes.Posts + '/create', post);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getPostPreviewsByThread = createAsyncThunk('posts/getPostPreviewsByThread', async (threadId: string, thunkAPI) => {
  try {
    const response = await axios.get(Routes.PostPreviews + `/thread/${threadId}`);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getPostPreviews = createAsyncThunk('posts/getPostPreviews', async (thunkAPI) => {
  try {
    const response = await axios.get(Routes.PostPreviews);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getPost = createAsyncThunk('posts/getPost', async (postId: string, thunkAPI) => {
  try {
    const response = await axios.get(`${Routes.Posts}/${postId}`);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getThreads = createAsyncThunk('posts/getThreads', async (thunkAPI) => {
  try {
    const response = await axios.get(`${Routes.Threads}`);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.error = null;
        }
      )
      .addMatcher(
        isRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  }
});

export default postsSlice.reducer;
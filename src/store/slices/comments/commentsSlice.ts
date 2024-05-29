'use strict';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Routes from '../../../constants/routes';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  comments: [],
};

export const getComments = createAsyncThunk('comments/getComments', async (postId, ThunkAPI) => {
  try {
    const response = await axios.get(Routes.Comments + `/${postId}`);
    return response.data;
  } catch(err) {
    ThunkAPI.rejectWithValue(err.response.status);
  }
});

export const addComment = createAsyncThunk('comments/addComment', async ({postId, data}: {postId: string, data: any}, ThunkAPI) => {
  try {
    const response = await axios.post(Routes.Comments + `/${postId}/add`, data);
    return response.data;
  } catch(err) {
    ThunkAPI.rejectWithValue(err.response.status);
  }
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.comments = action.payload.data;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// export const {  } = commentsSlice.actions;

export default commentsSlice.reducer;
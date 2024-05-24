'use strict';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Routes from '../../../constants/routes';

const initialState = {
  token: localStorage.getItem('token') || null,
  loggedIn: !!localStorage.getItem('token'),
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const login = createAsyncThunk('auth/login', async (data : unknown) => {
  try {
    const response = await axios.post(Routes.User + '/login', data);

    return response.data;
  } catch(err) {
    throw new Error(err.response.status);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.status = 'idle';
      state.error = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.loggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = true;
        state.error = null;

        localStorage.setItem('user', action.payload.userId);
        localStorage.setItem('token', 'jwt-placeholder' );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
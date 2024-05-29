'use strict';

import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';

import Routes from '../../../constants/routes';

const initialState = {
  token: localStorage.getItem('token') || null,
  loggedIn: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const login = createAsyncThunk('auth/login', async (data : unknown, thunkAPI) => {
  try {
    const response = await axios.post(Routes.User + '/login', data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (data : unknown, thunkAPI) => {
  try {
    const response = await axios.post(Routes.User + '/register', data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (userId: string, thunkAPI) => {
  try {
    const response = await axios.get(Routes.Profiles + `/${userId}`);
    console.log(response);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
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
      state.user = null;

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
        state.user = JSON.stringify(action.payload.data);

        localStorage.setItem('user', JSON.stringify(action.payload.data));
        localStorage.setItem('token', 'jwt-placeholder' );
      })
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
  }});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
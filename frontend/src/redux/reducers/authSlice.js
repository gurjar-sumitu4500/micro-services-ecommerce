// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthBaseUrl } from '../../config';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    checkAuthSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    checkAuthFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, registerSuccess, registerFailure, logout, checkAuthSuccess, checkAuthFailure } = authSlice.actions;

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue, dispatch}) => {
    try {
      // const res = await axios.post(`${getAuthBaseUrl()}/api/auth/login`, userData, { withCredentials: true});
      const res = await axios.get(`${getAuthBaseUrl()}/login`);
      if (res.status === 200) {
        dispatch(loginSuccess(res.data))
        return res.data.token;
      } else {
        return rejectWithValue(res.data.error);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`${getAuthBaseUrl()}/api/auth/register`, userData);
      console.log({res})
      if (res.status === 200) {
        dispatch(registerSuccess(res.data));
        return res.data.token;
      } else {
        return rejectWithValue(res.data.error);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post(`${getAuthBaseUrl()}/api/auth/checkAuth`, _, { withCredentials: true});
      if (res.status === 200) {
        dispatch(checkAuthSuccess(res.data))
        return res.status;
      } else {
        return rejectWithValue(res.data.error);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export default authSlice.reducer;

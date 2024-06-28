import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk('auth/register', async credentials => {
  const response = await axios.post('/users/signup', credentials);
  token.set(response.data.token);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async credentials => {
  const response = await axios.post('/users/login', credentials);
  token.set(response.data.token);
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/users/logout');
  token.unset();
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (persistedToken, thunkAPI) => {
    token.set(persistedToken);
    const response = await axios.get('/users/current');
    return response.data;
  }
);

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState(state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;

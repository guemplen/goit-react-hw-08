import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearContacts } from '../contacts/slice';
import { persistor } from '../store';

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

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await axios.post('/users/logout');
    token.unset();
    dispatch(clearContacts());
    persistor.purge();
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (persistedToken, { dispatch }) => {
    token.set(persistedToken);
    const response = await axios.get('/users/current');
    return response.data;
  }
);

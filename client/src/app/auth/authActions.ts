import { RegisterInput } from '../../components/auth/Register';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, delay } from '../api';
import { LoginInput } from '../../components/auth/Login';

export const register = createAsyncThunk(
  'auth/register',
  async (body: RegisterInput, { rejectWithValue }) => {
    try {
      delay(2000);
      const { data } = await api.post(`/user`, body);
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (body: LoginInput, { rejectWithValue }) => {
    try {
      delay(2000);
      const { data } = await api.get(`/user?search=${body.email}`);
      return data[0];
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

import { RegisterInput } from '../../components/auth/Register';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, delay } from '../api';
import { LoginInput } from '../../components/auth/Login';
import { UpdateUser } from '../../components/user/profile/ProfileUpdateForm';

export const register = createAsyncThunk(
  'user/register',
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
  'user/login',
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

export const updateProfile = createAsyncThunk(
  'user/update',
  async (
    {
      body,
      userId,
      callback,
    }: { body: UpdateUser; userId: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      delay(2000);
      const { data } = await api.put(`/user/${userId}`, body);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

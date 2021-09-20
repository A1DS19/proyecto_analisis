import { RegisterInput } from '../../components/auth/Register';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { LoginInput } from '../../components/auth/Login';
import { UpdateUser } from '../../components/user/profile/ProfileUpdateForm';

const saveTokenLocalStorage = (token: string): void => {
  localStorage.setItem('token', token);
};

export const register = createAsyncThunk(
  'user/register',
  async (body: RegisterInput, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/register`, body);
      saveTokenLocalStorage(data.token);
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (body: LoginInput, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/login`, body);
      saveTokenLocalStorage(data.token);
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const me = createAsyncThunk(
  '/user/me',
  async ({ callback }: { callback: () => void }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (data.user) {
        callback();
      }

      return data.user;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
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
      const { data } = await api.put(`/user/id/${userId}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback && callback();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const requestPasswordReset = async (email: string) => {
  try {
    await api.post('/user/password-reset', { email });
  } catch (err: any) {
    console.log(err.response.data.err);
  }
};

export const resetPassword = async ({
  body,
}: {
  body: { password: string; token: string };
}) => {
  try {
    const { data } = await api.post('/user/reset-password', body);
    return data.msg;
  } catch (err: any) {
    console.log(err.response.data.err);
  }
};

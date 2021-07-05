import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, User } from './types';
import { login, register } from './authActions';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

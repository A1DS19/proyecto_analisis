import { createSlice } from '@reduxjs/toolkit';
import { Order, User } from './types';
import {
  registerExtraReducers,
  loginExtraReducers,
  updateUserDataExtraReducer,
} from './extraReducers/auth';
import {
  createOrderExtraReducers,
  fetchOrdersExtraReducers,
} from './extraReducers/orders';

export interface UserState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  orders: Array<Order> | [];
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  loading: false,
  orders: [],
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    registerExtraReducers(builder);
    loginExtraReducers(builder);
    fetchOrdersExtraReducers(builder);
    createOrderExtraReducers(builder);
    updateUserDataExtraReducer(builder);
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;

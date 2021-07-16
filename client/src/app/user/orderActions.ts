import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Order } from './types';

interface Callback {
  callback?: () => void;
}

interface CreateOrderInput extends Callback {
  body: Order;
}

interface FetchCurrentUserOrders extends Callback {
  userId: string;
}

export const fetchOrders = createAsyncThunk(
  'user/fetchOrders',
  async ({ userId, callback }: FetchCurrentUserOrders, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/order?userId=${userId}`);
      callback && callback();
      return data;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'user/createOrder',
  async ({ body, callback }: CreateOrderInput, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/order', body);
      callback && callback();

      return data;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

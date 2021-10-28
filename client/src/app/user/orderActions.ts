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
      const { data } = await api.get(`/order?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.response.data.err);
    }
  }
);

export const createOrder = createAsyncThunk(
  'user/createOrder',
  async ({ body, callback }: CreateOrderInput, { rejectWithValue }) => {
    console.log(body);

    try {
      const { data } = await api.post('/order/', body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback && callback();

      return data;
    } catch (err: any) {
      rejectWithValue(err.response.data.err);
    }
  }
);

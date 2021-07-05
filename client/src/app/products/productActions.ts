import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, delay } from '../api';

export const fetchProducts = createAsyncThunk(
  'product/fecthProducts',
  async (_, { rejectWithValue }) => {
    try {
      delay(2000);
      const { data } = await api.get(`/products`);
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      delay(200);
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

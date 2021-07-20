import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, delay } from '../api';

export const fetchProducts = createAsyncThunk(
  'product/fecthProducts',
  async (category: string, { rejectWithValue }) => {
    try {
      delay(2000);
      const { data } = await api.get(
        category ? `/products?category=${category}` : `/products`
      );
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

export const fetchProductByName = createAsyncThunk(
  'admin/fetchProduct',
  async (
    { name, callback }: { name: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      delay(200);
      const { data } = await api.get(`/products?name=${name}`);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

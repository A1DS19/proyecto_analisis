import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

export const fetchProducts = createAsyncThunk(
  'product/fecthProducts',
  async (
    { category, page, limit }: { category: string; page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        category
          ? `/products?category=${category}&page=${page}&limit=${limit}`
          : `/products?page=${page}&limit=${limit}`
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
      const { data } = await api.get(`/products/id/${id}`);
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
      const { data } = await api.get(`/products/name/${name}`);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const fetchAllPromotions = createAsyncThunk(
  'product/fetchAllPromotions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products/promotions');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const deleteImage = async (
  public_id: string,
  callback: () => void
): Promise<void> => {
  try {
    const { data } = await api.post('/products/delete_image', { public_id });
    if (data) {
      callback();
    }
  } catch (err: any) {
    console.log(err);
  }
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

export const fetchProducts = createAsyncThunk(
  'product/fecthProducts',
  async (
    {
      category,
      page,
      limit,
      callback,
    }: { category: string; page: number; limit: number; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        category
          ? `/products?category=${category}&page=${page}&limit=${limit}`
          : `/products?page=${page}&limit=${limit}`
      );

      callback && callback();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
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
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const fetchProductByName = createAsyncThunk(
  'product/fetchProductByName',
  async (
    { name, callback }: { name: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(`/products/name/${name.trim()}`);
      callback && callback();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const fetchAllPromotions = createAsyncThunk(
  'product/fetchAllPromotions',
  async ({ category }: { category: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        category ? `/products/promotions/${category}` : `/products/promotions/all`
      );

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
    const { data } = await api.post(
      '/products/delete_image',
      { public_id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (data) {
      callback();
    }
  } catch (err: any) {
    console.log(err);
  }
};

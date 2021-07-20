import { createAsyncThunk } from '@reduxjs/toolkit';
import { string } from 'yup/lib/locale';
import { IsUpdateOrCreate } from '../../components/admin/inventory/AddUpdateProduct';
import { api, delay } from '../api';

export const fetchProducts = createAsyncThunk(
  'admin/fecthProducts',
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

export const fetchProductById = createAsyncThunk(
  'admin/fetchProductById',
  async (
    { id, callback }: { id: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      delay(200);
      const { data } = await api.get(`/products/${id}`);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'admin/fetchCategories',
  async ({ callback }: { callback?: () => void }, { rejectWithValue }) => {
    try {
      delay(200);
      const { data } = await api.get(`/category`);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (
    { body, callback }: { body: IsUpdateOrCreate; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      delay(200);
      const { data } = await api.post(`/products`, body);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async (
    { id, body, callback }: { id: string; body: IsUpdateOrCreate; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      delay(200);
      const { data } = await api.put(`/products/${id}`, body);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'admin/removeProduct',
  async (
    { id, callback }: { id: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      delay(200);
      await api.delete(`/products/${id}`);
      callback && callback();
      return id;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

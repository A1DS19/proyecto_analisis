import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { IAddUpdatePromotion } from '../../../components/admin/promotions/AddUpdatePromotion';

export const updateProductDiscount = createAsyncThunk(
  'admin/updateProductDiscount',
  async (
    {
      input,
      id,
      callback,
    }: { id: string; input: IAddUpdatePromotion; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(`/products/promotions/id/${id}`, input, {
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

export const deleteProductDiscount = createAsyncThunk(
  'admin/deleteProductDiscount',
  async (
    { id, callback }: { id: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.delete(`/products/promotions/id/${id}`, {
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

export const fetchAllPromotions = createAsyncThunk(
  'admin/fetchAllPromotions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products/promotions/all');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

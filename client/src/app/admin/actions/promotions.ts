import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, delay } from '../../api';
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
      delay(200);
      const { data } = await api.put(`/products/${id}`, input);
      callback && callback();
      return data;
    } catch (err) {
      rejectWithValue(err.message);
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
      const removeDiscountValue = {
        isDiscounted: false,
        discountedPrice: 0,
      };

      delay(200);
      const { data } = await api.put(`/products/${id}`, removeDiscountValue);
      callback && callback();
      return data;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

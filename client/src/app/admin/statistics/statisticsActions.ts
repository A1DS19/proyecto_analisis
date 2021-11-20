import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export const mostReservedProducts = createAsyncThunk(
  'statistics/mostReservedProducts',
  async (sort, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/statistics/reserved-products?sort=${-1}`);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const lessReservedProducts = createAsyncThunk(
  'statistics/lessReservedProducts',
  async (sort, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/statistics/reserved-products?sort=${1}`);

      return data.reverse();
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const totalIncomeOrders = createAsyncThunk(
  'statistics/totalIncomeOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/statistics/total-income-orders');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const categoriesWithAmount = createAsyncThunk(
  'statistics/categoriesWithAmount',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/statistics/categories-total-orders');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const amountOrdersExpress = createAsyncThunk(
  'statistics/amountOrdersExpress',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/statistics/total-orders?pickup=${false}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const amountOrdersPickup = createAsyncThunk(
  'statistics/amountOrdersPickup',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/statistics/total-orders?pickup=${true}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const geoZoneExpress = createAsyncThunk(
  'statistics/geoZoneExpress',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/statistics/geo-zone-express`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

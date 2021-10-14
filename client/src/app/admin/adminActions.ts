import { createAsyncThunk } from '@reduxjs/toolkit';
import { IsUpdateOrCreate } from '../../components/admin/inventory/AddUpdateProduct';
import { filter_order } from '../../components/admin/orders/OrdersIndex';
import { AddUpdateUserIntialValues } from '../../components/admin/users/AddUpdateUser';
import { api, delay } from '../api';
import { Order } from '../user/types';

//PRODUCTS
export const fetchProducts = createAsyncThunk(
  'admin/fecthProducts',
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
      const { data } = await api.get(`/products/name/${name.trim()}`);
      callback && callback();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.err);
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
      const { data } = await api.get(`/products/id/${id}`);
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
      const { data } = await api.get(`/category/`);
      callback && callback();

      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

//FALTA VALIDAR HASTA TENER IMAGEN
export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (
    { body, callback }: { body: IsUpdateOrCreate; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post(`/products`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
      const { data } = await api.put(`/products/id/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
      await api.delete(`/products/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback && callback();
      return id;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

//CATEGORIES
export const createCategory = createAsyncThunk(
  'admin/createCategory',
  async (
    { name, callback }: { name: string; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post(
        `/category/`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async (
    { name, id, callback }: { id: string; name: string; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(
        `/category/id/${id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async ({ id, callback }: { id: string; callback: () => void }, { rejectWithValue }) => {
    try {
      await api.delete(`/category/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback && callback();
      return id;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

//USERS
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async ({ callback }: { callback?: () => void }, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/user/users', {
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

export const fetchUserById = createAsyncThunk(
  'admin/fetchUserbyId',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (err: any) {
      rejectWithValue(err.response.data.err);
    }
  }
);

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (
    { input, callback }: { input: AddUpdateUserIntialValues; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post('/user/user', input, {
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

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (
    {
      input,
      id,
      callback,
    }: { id: string; input: AddUpdateUserIntialValues; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(`/user/user/${id}`, input, {
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

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async ({ id, callback }: { id: string; callback: () => void }, { rejectWithValue }) => {
    try {
      await api.delete(`/user/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback && callback();
      return id;
    } catch (err: any) {
      rejectWithValue(err.response.data.err);
    }
  }
);

export const fetchUserByIdNumber = createAsyncThunk(
  'admin/fetchUser',
  async (
    { idNumber, callback }: { idNumber: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(`/user/user/idNumber/${idNumber}`, {
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

//ORDERS
export const fetchOrders = createAsyncThunk(
  'admin/fetchOrders',
  async ({ filter }: { filter: filter_order }, { rejectWithValue }) => {
    try {
      const { data } =
        filter === 'todas'
          ? await api.get(`/order`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
          : await api.get(
              `/order?isDelivered=${filter === 'entregada' ? 'true' : 'false'}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );

      return data;
    } catch (err: any) {
      rejectWithValue(err.response.data.err);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'admin/fetchOrderById',
  async (
    { id, callback }: { id: string; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(`/order?id=${id}`);
      callback && callback();
      return data;
    } catch (err: any) {
      rejectWithValue(err.response.data.err);
    }
  }
);

export const updateOrderState = createAsyncThunk(
  'admin/updateOrderState',
  async (
    { input, id, callback }: { id: string; input: Order; callback?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(`/order/${id}`, input, {
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

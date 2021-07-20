import { createSlice } from '@reduxjs/toolkit';
import { Category, Product } from '../products/types';
import { Order, User } from '../user/types';
import {
  createProductExtraReducer,
  fetchCategoriesExtraReducer,
  fetchProductByIdExtraReducer,
  fetchProductExtraReducer,
  fetchProductsExtraReducer,
  removeProductExtraReducers,
  updateProductExtraReducer,
} from './extraReducers/InventoryExtraReducers';

export interface AdminState {
  users: User[];
  inventory: Product[];
  product: Product | null;
  orders: Order[];
  order: Order | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  inventory: [],
  product: null,
  orders: [],
  order: null,
  categories: [],
  loading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    fetchProductsExtraReducer(builder);
    fetchProductExtraReducer(builder);
    fetchProductByIdExtraReducer(builder);
    fetchCategoriesExtraReducer(builder);
    createProductExtraReducer(builder);
    updateProductExtraReducer(builder);
    removeProductExtraReducers(builder);
  },
});

export const adminReducer = adminSlice.reducer;

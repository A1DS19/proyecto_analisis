import { createSlice } from '@reduxjs/toolkit';
import { Category, Product } from '../products/types';
import { Order, User } from '../user/types';
import {
  createCategoryExtraReducers,
  createProductExtraReducer,
  deleteCategoryExtraReducers,
  fetchCategoriesExtraReducer,
  fetchProductByIdExtraReducer,
  fetchProductExtraReducer,
  fetchProductsExtraReducer,
  removeProductExtraReducers,
  updateCategoryExtraReducers,
  updateProductExtraReducer,
  deleteProductDiscountExtraReducers,
  updateProductDiscountExtraReducers,
  fetchAllPromotionsExtraReducers,
} from './extraReducers/InventoryExtraReducers';
import {
  createUserExtraReducer,
  deleteUserExtraReducer,
  fetchUserByIdExtraReducer,
  fetchUserByINumberExtraReducer,
  fetchUsersExtraReducer,
  updateUserExtraReducer,
} from './extraReducers/userExtraReducers';
import {
  fetchOrdersByIdExtraReducer,
  fetchOrdersExtraReducer,
  updateOrderStateExtraReducer,
} from './extraReducers/ordersExtraReducer';

export interface AdminState {
  users: User[];
  user: User | null;
  inventory: Product[];
  product: Product | null;
  orders: Order[];
  order: Order | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  limit: number;
  totalPages: number;
  discountedProducts: Product[];
}

const initialState: AdminState = {
  users: [],
  user: null,
  inventory: [],
  discountedProducts: [],
  product: null,
  orders: [],
  order: null,
  categories: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  limit: 10000000000000,
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
    updateCategoryExtraReducers(builder);
    createCategoryExtraReducers(builder);
    deleteCategoryExtraReducers(builder);
    fetchUsersExtraReducer(builder);
    fetchUserByIdExtraReducer(builder);
    createUserExtraReducer(builder);
    updateUserExtraReducer(builder);
    deleteUserExtraReducer(builder);
    fetchUserByINumberExtraReducer(builder);
    fetchOrdersExtraReducer(builder);
    fetchOrdersByIdExtraReducer(builder);
    updateOrderStateExtraReducer(builder);
    deleteProductDiscountExtraReducers(builder);
    updateProductDiscountExtraReducers(builder);
    fetchAllPromotionsExtraReducers(builder);
  },
});

export const adminReducer = adminSlice.reducer;

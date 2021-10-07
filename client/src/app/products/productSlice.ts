import { Product } from './types';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProduct,
  fetchProductByName,
  fetchProducts,
  fetchAllPromotions,
} from './productActions';
import { toInteger } from 'lodash';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  discountedProducts: Product[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  limit: number;
}

const initialState: ProductState = {
  products: [],
  discountedProducts: [],
  selectedProduct: null,
  loading: false,
  totalPages: 0,
  currentPage: 1,
  limit: 3,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    nextPage(state) {
      state.currentPage += 1;
    },
    clearPagination(state) {
      state.products = [];
      state.currentPage = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    //fetchProducts
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;

      //Concatenate array and filter duplicates
      state.products = state.products
        .concat(action.payload.products)
        .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

      state.currentPage = toInteger(action.payload.currentPage);
      state.totalPages = action.payload.totalPages;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
    });
    //fetchProduct
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
    });
    //fetch product by name
    builder.addCase(fetchProductByName.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductByName.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = action.payload ? action.payload : state.products;
      state.products = action.payload;
    });
    builder.addCase(fetchProductByName.rejected, (state, action) => {
      state.loading = false;
    });
    //fetch all promotions
    //fetch product by name
    builder.addCase(fetchAllPromotions.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPromotions.fulfilled, (state, action) => {
      state.loading = false;
      state.discountedProducts = action.payload;
    });
    builder.addCase(fetchAllPromotions.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { clearSelectedProduct, nextPage, clearPagination } = productSlice.actions;
export const productReducer = productSlice.reducer;

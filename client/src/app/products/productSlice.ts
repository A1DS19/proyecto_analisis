import { Product } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProduct, fetchProducts } from './productActions';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    //fetchProducts
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
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
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;

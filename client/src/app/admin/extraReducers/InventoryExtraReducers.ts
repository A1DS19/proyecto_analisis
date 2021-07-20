import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  createProduct,
  fetchCategories,
  fetchProduct,
  fetchProductById,
  fetchProducts,
  removeProduct,
  updateProduct,
} from '../adminActions';
import { AdminState } from '../adminSlice';

export const fetchProductsExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
): void => {
  builder.addCase(fetchProducts.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.inventory = action.payload;
  });
  builder.addCase(fetchProducts.rejected, (state, action) => {
    state.loading = false;
  });
};

export const fetchProductExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(fetchProduct.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.inventory = action.payload;
  });
  builder.addCase(fetchProduct.rejected, (state, action) => {
    state.loading = false;
  });
};

export const fetchProductByIdExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(fetchProductById.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchProductById.fulfilled, (state, action) => {
    state.loading = false;
    state.product = action.payload;
  });
  builder.addCase(fetchProductById.rejected, (state, action) => {
    state.loading = false;
  });
};
export const fetchCategoriesExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(fetchCategories.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchCategories.fulfilled, (state, action) => {
    state.loading = false;
    state.categories = action.payload;
  });
  builder.addCase(fetchCategories.rejected, (state, action) => {
    state.loading = false;
  });
};

export const createProductExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(createProduct.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(createProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.inventory = [...state.inventory, action.payload];
  });
  builder.addCase(createProduct.rejected, (state, action) => {
    state.loading = false;
  });
};

export const updateProductExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(updateProduct.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(updateProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.inventory = [
      ...state.inventory.filter((product) => product.id !== action.payload.id),
      action.payload,
    ];
  });
  builder.addCase(updateProduct.rejected, (state, action) => {
    state.loading = false;
  });
};

export const removeProductExtraReducers = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(removeProduct.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(removeProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.inventory = [
      ...state.inventory.filter((product) => product.id !== action.payload),
    ];
  });
  builder.addCase(removeProduct.rejected, (state, action) => {
    state.loading = false;
  });
};

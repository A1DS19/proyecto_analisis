import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  createCategory,
  createProduct,
  deleteCategory,
  fetchCategories,
  fetchProduct,
  fetchProductById,
  fetchProducts,
  removeProduct,
  updateCategory,
  updateProduct,
} from '../adminActions';
import { deleteProductDiscount, updateProductDiscount } from '../actions/promotions';
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

export const createCategoryExtraReducers = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(createCategory.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(createCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.categories = [...state.categories, action.payload];
  });
  builder.addCase(createCategory.rejected, (state, action) => {
    state.loading = false;
  });
};

export const updateCategoryExtraReducers = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(updateCategory.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(updateCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.categories = [
      ...state.categories.filter((item) => item.id !== action.payload.id),
      action.payload,
    ];
  });
  builder.addCase(updateCategory.rejected, (state, action) => {
    state.loading = false;
  });
};

export const deleteCategoryExtraReducers = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(deleteCategory.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deleteCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.categories = [...state.categories.filter((item) => item.id !== action.payload)];
  });
  builder.addCase(deleteCategory.rejected, (state, action) => {
    state.loading = false;
  });
};

export const updateProductDiscountExtraReducers = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(updateProductDiscount.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(updateProductDiscount.fulfilled, (state, action) => {
    state.loading = false;

    state.inventory = [
      ...state.inventory.filter((item) => item.id !== action.payload.id),
      action.payload,
    ];
  });
  builder.addCase(updateProductDiscount.rejected, (state, action) => {
    state.loading = false;
  });
};

export const deleteProductDiscountExtraReducers = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(deleteProductDiscount.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deleteProductDiscount.fulfilled, (state, action) => {
    state.loading = false;
    state.inventory = [
      ...state.inventory.filter((item) => item.id !== action.payload.id),
      action.payload,
    ];
  });
  builder.addCase(deleteProductDiscount.rejected, (state, action) => {
    state.loading = false;
  });
};

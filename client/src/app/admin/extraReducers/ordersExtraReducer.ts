import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchOrderById, fetchOrders, updateOrderState } from '../adminActions';
import { AdminState } from '../adminSlice';

export const fetchOrdersExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
): void => {
  builder.addCase(fetchOrders.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });
  builder.addCase(fetchOrders.rejected, (state, action) => {
    state.loading = false;
  });
};

export const fetchOrdersByIdExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
): void => {
  builder.addCase(fetchOrderById.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchOrderById.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });
  builder.addCase(fetchOrderById.rejected, (state, action) => {
    state.loading = false;
  });
};

export const updateOrderStateExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
): void => {
  builder.addCase(updateOrderState.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(updateOrderState.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = [
      ...state.orders.filter((order) => order.id !== action.payload.id),
      action.payload,
    ];
  });
  builder.addCase(updateOrderState.rejected, (state, action) => {
    state.loading = false;
  });
};

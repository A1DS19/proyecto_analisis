import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserState } from '../userSlice';
import { createOrder as createOrderAction, fetchOrders } from '../orderActions';
import { Order } from '../types';

export const fetchOrdersExtraReducers = (
  builder: ActionReducerMapBuilder<UserState>
): void => {
  builder.addCase(fetchOrders.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = action.payload as unknown as Order[];
  });
  builder.addCase(fetchOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const createOrderExtraReducers = (
  builder: ActionReducerMapBuilder<UserState>
): void => {
  builder.addCase(createOrderAction.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(createOrderAction.fulfilled, (state, action) => {
    state.loading = false;
    state.orders = [...state.orders, action.payload as unknown as Order];
  });
  builder.addCase(createOrderAction.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

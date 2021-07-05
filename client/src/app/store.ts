import { cartReducer } from './cart/cartSlice';
import { productReducer } from './products/productSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { cartReducer } from './cart/cartSlice';
import { productReducer } from './products/productSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
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

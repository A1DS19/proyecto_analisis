import { cartReducer } from './cart/cartSlice';
import { productReducer } from './products/productSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';
import { adminReducer } from './admin/adminSlice';
import { statisticsReducer } from './admin/statistics/statisticsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    admin: adminReducer,
    statistics: statisticsReducer,
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

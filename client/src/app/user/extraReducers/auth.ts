import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { login, register } from '../userActions';
import { UserState } from '../userSlice';

export const registerExtraReducers = (
  builder: ActionReducerMapBuilder<UserState>
): void => {
  builder.addCase(register.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(register.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuth = true;
  });
  builder.addCase(register.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const loginExtraReducers = (builder: ActionReducerMapBuilder<UserState>): void => {
  builder.addCase(login.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(login.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuth = true;
  });
  builder.addCase(login.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

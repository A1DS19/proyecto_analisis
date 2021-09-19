import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { login, register, updateProfile, me } from '../userActions';
import { UserState } from '../userSlice';

export const registerExtraReducers = (
  builder: ActionReducerMapBuilder<UserState>
): void => {
  builder.addCase(register.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(register.fulfilled, (state, action) => {
    state.loading = false;
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
  });
  builder.addCase(login.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const meExtraReducers = (builder: ActionReducerMapBuilder<UserState>): void => {
  builder.addCase(me.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(me.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuth = localStorage.getItem('token') ? true : false;
  });
  builder.addCase(me.rejected, (state, action) => {
    state.loading = false;
    //state.error = action.payload as string;
  });
};

export const updateUserDataExtraReducer = (
  builder: ActionReducerMapBuilder<UserState>
): void => {
  builder.addCase(updateProfile.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(updateProfile.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
  });
  builder.addCase(updateProfile.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

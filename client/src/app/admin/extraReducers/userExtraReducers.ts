import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AdminState } from '../adminSlice';
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  fetchUserByIdNumber,
} from '../adminActions';

export const fetchUsersExtraReducer = (builder: ActionReducerMapBuilder<AdminState>) => {
  builder.addCase(fetchUsers.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchUsers.fulfilled, (state, action) => {
    state.loading = false;
    state.users = action.payload;
  });
  builder.addCase(fetchUsers.rejected, (state, action) => {
    state.loading = false;
  });
};

export const fetchUserByIdExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(fetchUserById.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchUserById.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
  });
  builder.addCase(fetchUserById.rejected, (state, action) => {
    state.loading = false;
  });
};

export const createUserExtraReducer = (builder: ActionReducerMapBuilder<AdminState>) => {
  builder.addCase(createUser.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(createUser.fulfilled, (state, action) => {
    state.loading = false;
    state.users = [...state.users, action.payload];
  });
  builder.addCase(createUser.rejected, (state, action) => {
    state.loading = false;
  });
};

export const updateUserExtraReducer = (builder: ActionReducerMapBuilder<AdminState>) => {
  builder.addCase(updateUser.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(updateUser.fulfilled, (state, action) => {
    state.loading = false;
    state.users = [
      ...state.users.filter((user) => user.id !== action.payload.id),
      action.payload,
    ];
  });
  builder.addCase(updateUser.rejected, (state, action) => {
    state.loading = false;
  });
};

export const deleteUserExtraReducer = (builder: ActionReducerMapBuilder<AdminState>) => {
  builder.addCase(deleteUser.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deleteUser.fulfilled, (state, action) => {
    state.loading = false;
    state.users = [...state.users.filter((user) => user.id !== action.payload)];
  });
  builder.addCase(deleteUser.rejected, (state, action) => {
    state.loading = false;
  });
};

export const fetchUserByINumberExtraReducer = (
  builder: ActionReducerMapBuilder<AdminState>
) => {
  builder.addCase(fetchUserByIdNumber.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fetchUserByIdNumber.fulfilled, (state, action) => {
    state.loading = false;
    state.users = action.payload;
  });
  builder.addCase(fetchUserByIdNumber.rejected, (state, action) => {
    state.loading = false;
  });
};

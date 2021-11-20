import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  mostReservedProducts,
  lessReservedProducts,
  totalIncomeOrders,
  categoriesWithAmount,
  amountOrdersExpress,
  amountOrdersPickup,
  geoZoneExpress,
} from './statisticsActions';
import { StatisticsState } from './statisticsSlice';

export const mostReservedProductsExtraReducers = (
  builder: ActionReducerMapBuilder<StatisticsState>
): void => {
  builder.addCase(mostReservedProducts.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(mostReservedProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.mostReservedProducts = action.payload;
  });
  builder.addCase(mostReservedProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const lessReservedProductsExtraReducers = (
  builder: ActionReducerMapBuilder<StatisticsState>
): void => {
  builder.addCase(lessReservedProducts.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(lessReservedProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.lessReservedProducts = action.payload;
  });
  builder.addCase(lessReservedProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const totalIncomeOrdersExtraReducers = (
  builder: ActionReducerMapBuilder<StatisticsState>
): void => {
  builder.addCase(totalIncomeOrders.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(totalIncomeOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.totalIncomeOrders = action.payload;
  });
  builder.addCase(totalIncomeOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const categoriesWithAmountExtraReducers = (
  builder: ActionReducerMapBuilder<StatisticsState>
): void => {
  builder.addCase(categoriesWithAmount.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(categoriesWithAmount.fulfilled, (state, action) => {
    state.loading = false;
    state.categoriesWithAmount = action.payload;
  });
  builder.addCase(categoriesWithAmount.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const amountOrdersExpressExtraReducers = (
  builder: ActionReducerMapBuilder<StatisticsState>
): void => {
  builder.addCase(amountOrdersExpress.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(amountOrdersExpress.fulfilled, (state, action) => {
    state.loading = false;
    state.amountOrdersExpress = action.payload;
  });
  builder.addCase(amountOrdersExpress.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const amountOrdersPickupExtraReducers = (
  builder: ActionReducerMapBuilder<StatisticsState>
): void => {
  builder.addCase(amountOrdersPickup.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(amountOrdersPickup.fulfilled, (state, action) => {
    state.loading = false;
    state.amountOrdersPickup = action.payload;
  });
  builder.addCase(amountOrdersPickup.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

export const geoZoneExpressExtraReducers = (
  builder: ActionReducerMapBuilder<StatisticsState>
): void => {
  builder.addCase(geoZoneExpress.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(geoZoneExpress.fulfilled, (state, action) => {
    state.loading = false;
    state.geoZoneExpress = action.payload;
  });
  builder.addCase(geoZoneExpress.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
};

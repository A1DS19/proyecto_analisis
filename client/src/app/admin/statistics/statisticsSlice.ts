import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../products/types';
import {
  lessReservedProductsExtraReducers,
  mostReservedProductsExtraReducers,
  totalIncomeOrdersExtraReducers,
  categoriesWithAmountExtraReducers,
  amountOrdersExpressExtraReducers,
  amountOrdersPickupExtraReducers,
  geoZoneExpressExtraReducers,
} from './statisticsExtraReducers';

export interface TotalIncomeOrders {
  totalOrders: number;
  totalRevenue: number;
}

export interface CategoriesWithAmount {
  _id: string;
  amount: number;
}

export interface GeoZoneExpress {
  _id: string;
  amount: number;
}

export interface StatisticsState {
  loading: boolean;
  error: string;
  mostReservedProducts: Product[];
  lessReservedProducts: Product[];
  totalIncomeOrders: TotalIncomeOrders;
  categoriesWithAmount: CategoriesWithAmount[];
  geoZoneExpress: GeoZoneExpress[];
  amountOrdersExpress: number;
  amountOrdersPickup: number;
}

const initialState: StatisticsState = {
  loading: false,
  error: '',
  mostReservedProducts: [],
  lessReservedProducts: [],
  totalIncomeOrders: {
    totalOrders: 0,
    totalRevenue: 0,
  },
  categoriesWithAmount: [
    {
      _id: '',
      amount: 0,
    },
  ],
  geoZoneExpress: [
    {
      _id: '',
      amount: 0,
    },
  ],
  amountOrdersExpress: 0,
  amountOrdersPickup: 0,
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    mostReservedProductsExtraReducers(builder);
    lessReservedProductsExtraReducers(builder);
    totalIncomeOrdersExtraReducers(builder);
    categoriesWithAmountExtraReducers(builder);
    amountOrdersExpressExtraReducers(builder);
    amountOrdersPickupExtraReducers(builder);
    geoZoneExpressExtraReducers(builder);
  },
});

export const statisticsReducer = statisticsSlice.reducer;

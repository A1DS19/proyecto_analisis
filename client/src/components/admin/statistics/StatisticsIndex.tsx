import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { MostReservedProductsOrderList } from './more-less-orders/MostReservedProductsOrderList';
import { LessReservedProductsOrderList } from './more-less-orders/LessReservedProductsOrderList';
import {
  amountOrdersExpress as amountOrdersExpressAction,
  amountOrdersPickup as amountOrdersPickupAction,
  categoriesWithAmount as categoriesWithAmountAction,
  geoZoneExpress as geoZoneExpressAction,
  lessReservedProducts as lessReservedProductsAction,
  mostReservedProducts as mostReservedProductsAction,
  totalIncomeOrders as totalIncomeOrdersAction,
} from '../../../app/admin/statistics/statisticsActions';
import { Box, Heading } from '@chakra-ui/react';
import { FullSpinner } from '../../common/FullSpinner';
import { IncomeTotalIndex } from './income-total/IncomeTotalIndex';
import { VisualizeIndex } from './visualize-cats-geo/VisualizeIndex';
interface StatisticsIndexProps {}

export const StatisticsIndex: React.FC<StatisticsIndexProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    loading,
    lessReservedProducts,
    mostReservedProducts,
    totalIncomeOrders,
    amountOrdersExpress,
    amountOrdersPickup,
    categoriesWithAmount,
    geoZoneExpress,
  } = useAppSelector((state) => state.statistics);

  React.useEffect(() => {
    dispatch(mostReservedProductsAction());
    dispatch(lessReservedProductsAction());
    dispatch(totalIncomeOrdersAction());
    dispatch(categoriesWithAmountAction());
    dispatch(amountOrdersExpressAction());
    dispatch(amountOrdersPickupAction());
    dispatch(geoZoneExpressAction());
  }, [dispatch]);

  if (loading) {
    return <FullSpinner />;
  }

  return (
    <React.Fragment>
      <Box mt={3} mb={9}>
        <IncomeTotalIndex
          totalIncomeOrders={totalIncomeOrders}
          amountOrdersExpress={amountOrdersExpress}
          amountOrdersPickup={amountOrdersPickup}
        />
      </Box>

      <Box my={9}>
        <VisualizeIndex
          categoriesWithAmount={categoriesWithAmount}
          geoZoneExpress={geoZoneExpress}
        />
      </Box>

      <Box my={9}>
        <Heading size='lg'>Productos mas reservados</Heading>
        <MostReservedProductsOrderList products={mostReservedProducts} />
      </Box>

      <Box mb={9}>
        <Heading size='lg'>Productos menos reservados</Heading>
        <LessReservedProductsOrderList products={lessReservedProducts} />
      </Box>
    </React.Fragment>
  );
};

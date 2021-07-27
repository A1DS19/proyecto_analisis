import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import { fetchOrders } from '../../../app/admin/adminActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { OrderFilter } from './OrderFilter';
import { OrdersTable } from './OrdersTable';
import { SearchOrder } from './SearchOrder';

interface OrdersIndexProps {}

export type filter_order = 'por_entregar' | 'entregada' | 'todas';

export const OrdersIndex: React.FC<OrdersIndexProps> = (): JSX.Element => {
  const { orders } = useAppSelector((state) => state.admin);
  const [filter, setFilter] = React.useState<filter_order>('todas');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchOrders({ filter }));
  }, [dispatch, filter]);

  return (
    <React.Fragment>
      <Box maxW='30%' my={3}>
        <SearchOrder />
      </Box>
      <Center>
        <OrderFilter filter={filter} setFilter={setFilter} />
      </Center>
      <OrdersTable orders={orders} />
    </React.Fragment>
  );
};

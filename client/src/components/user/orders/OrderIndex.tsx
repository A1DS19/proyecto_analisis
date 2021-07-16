import React from 'react';
import { fetchOrders } from '../../../app/user/orderActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { FullSpinner } from '../../common/FullSpinner';
import { OrderList } from './OrderList';

interface OrderIndexProps {}

export const OrderIndex: React.FC<OrderIndexProps> = (): JSX.Element => {
  const { orders, user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchOrders({ userId: user?.id! }));
  }, [dispatch, user?.id]);

  if (loading) {
    return <FullSpinner />;
  }

  return (
    <React.Fragment>
      <OrderList orders={orders} />
    </React.Fragment>
  );
};

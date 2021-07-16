import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Order } from '../../../app/user/types';
import { OrderItem } from './OrderItem';

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders }): JSX.Element => {
  const renderOrders = () => {
    return orders.map((order) => {
      return <OrderItem key={order.id} order={order} />;
    });
  };

  return (
    <React.Fragment>
      <Heading>Total de ordenes: {orders.length}</Heading>
      {renderOrders()}
    </React.Fragment>
  );
};

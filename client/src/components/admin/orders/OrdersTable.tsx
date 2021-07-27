import React from 'react';
import { Order } from '../../../app/user/types';
import { OrderItem } from './OrderItem';

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }): JSX.Element => {
  const renderOrders = () => {
    return orders.map((order) => {
      return <OrderItem key={order.id} order={order} />;
    });
  };

  return <React.Fragment>{renderOrders()}</React.Fragment>;
};

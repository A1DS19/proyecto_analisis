import { FormikProps } from 'formik';
import React from 'react';
import { CartItem } from '../../../../app/cart/types';
import { Order } from '../../../../app/orders/types';
import { OrderCartItem } from './OrderCartItem';

interface CartListProps {
  props: FormikProps<Order>;
  products: CartItem[];
}

export const OrderCartList: React.FC<CartListProps> = ({
  props,
  products,
}): JSX.Element => {
  const renderCartItem = () => {
    return products.map((product) => {
      return <OrderCartItem key={product.id} product={product} />;
    });
  };
  return <React.Fragment>{renderCartItem()}</React.Fragment>;
};

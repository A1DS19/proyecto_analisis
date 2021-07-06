import React from 'react';
import { CartItem } from '../../app/cart/types';
import { CartItem as CartItemComponent } from './CartItem';

interface CartListProps {
  products: CartItem[];
}

export const CartList: React.FC<CartListProps> = ({ products }): JSX.Element => {
  const renderCartItem = () => {
    return products.map((product) => {
      return <CartItemComponent key={product.id} product={product} />;
    });
  };
  return <React.Fragment>{renderCartItem()}</React.Fragment>;
};

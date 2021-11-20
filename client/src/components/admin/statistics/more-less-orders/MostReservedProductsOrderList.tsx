import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../../../app/products/types';
import { OrderItem } from './OrderItem';

interface OrderListProps {
  products: Product[];
}

export const MostReservedProductsOrderList: React.FC<OrderListProps> = ({
  products,
}): JSX.Element => {
  const renderOrders = () => {
    return products.map((product) => {
      return (
        <React.Fragment>
          <OrderItem product={product} />
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      <Flex maxWidth='900px' overflowX='auto'>
        {renderOrders()}
      </Flex>
    </React.Fragment>
  );
};

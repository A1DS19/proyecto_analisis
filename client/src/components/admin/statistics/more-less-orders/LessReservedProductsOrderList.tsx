import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { Product } from '../../../../app/products/types';
import { OrderItem } from './OrderItem';

interface LessReservedProductsOrderListProps {
  products: Product[];
}

export const LessReservedProductsOrderList: React.FC<LessReservedProductsOrderListProps> =
  ({ products }): JSX.Element => {
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

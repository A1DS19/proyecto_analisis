import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../../app/products/types';
import { ProductDiscountItem } from './ProductDiscountItem';

interface ProductDiscountListProps {
  products: Product[];
}

export const ProductDiscountList: React.FC<ProductDiscountListProps> = ({
  products,
}): JSX.Element => {
  const renderDiscountedProducts = () => {
    return products.map((product) => {
      return <ProductDiscountItem key={product.id} product={product} />;
    });
  };

  return (
    <React.Fragment>
      <Flex>{renderDiscountedProducts()}</Flex>
    </React.Fragment>
  );
};

import React from 'react';
import { Product } from '../../app/products/types';
import { Flex, Text } from '@chakra-ui/react';

interface DiscountedPriceProps {
  product: Product;
  original_price_size: 'sm' | 'lg' | 'md' | 'xl' | number;
  discounted_price_size: 'sm' | 'lg' | 'md' | 'xl' | number;
}

export const DiscountedPrice: React.FC<DiscountedPriceProps> = ({
  product,
  discounted_price_size,
  original_price_size,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Flex>
        <Text fontSize={original_price_size} textDecoration='line-through'>
          ₡{product.price}
        </Text>
        <Text ml={1} fontSize={discounted_price_size} fontWeight='bold'>
          ₡{product.discountedPrice}
        </Text>
      </Flex>
    </React.Fragment>
  );
};

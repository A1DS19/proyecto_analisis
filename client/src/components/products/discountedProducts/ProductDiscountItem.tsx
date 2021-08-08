import React from 'react';
import { Product } from '../../../app/products/types';
import { Box, Image } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DiscountedPrice } from '../../common/DiscountedPrice';

interface ProductDiscountItemProps {
  product: Product;
}

export const ProductDiscountItem: React.FC<ProductDiscountItemProps> = ({
  product,
}): JSX.Element => {
  const history = useHistory();

  return (
    <Box
      width={218}
      cursor='pointer'
      mx={3}
      position='relative'
      onClick={() => history.push(`/product/${product.id}`)}
    >
      <Image rounded={'lg'} src={product.images[0]} />
      <Box color='gray.700' fontSize='md' position='absolute' top='1px' right='5px'>
        <DiscountedPrice
          product={product}
          discounted_price_size='lg'
          original_price_size='md'
        />
      </Box>
    </Box>
  );
};

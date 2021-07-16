import React from 'react';
import { Flex, Image, Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../../app/cart/types';

interface OrderProductItemProps {
  product: CartItem;
}

export const OrderProductItem: React.FC<OrderProductItemProps> = ({
  product,
}): JSX.Element => {
  return (
    <Flex mb={3}>
      <Image
        maxH='80px'
        maxW='80px'
        borderRadius='lg'
        src={product.images[0]}
        alt='imagen carrito'
      />

      <Box margin='auto 0' ml={3}>
        <Heading cursor='pointer' fontSize={'md'} fontFamily={'body'} fontWeight={800}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </Heading>
        <Flex fontWeight={800} fontSize={'md'}>
          <Text>Cantidad:</Text>
          <Text color='orange.300'>{product.selectedQuantity}</Text>
        </Flex>

        <Flex fontWeight={800} fontSize='md'>
          <Text>Precio:</Text>
          <Text color='orange.300'>₡{product.price * product.selectedQuantity}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

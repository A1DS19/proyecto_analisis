import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as ICartItem } from '../../../../app/cart/types';

interface CartItemProps {
  product: ICartItem;
}

export const OrderCartItem: React.FC<CartItemProps> = ({ product }): JSX.Element => {
  return (
    <Box bgColor='gray.700' padding={3} borderRadius='lg' my={3}>
      <Flex>
        <Image
          maxH='70px'
          maxW='70px'
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
    </Box>
  );
};

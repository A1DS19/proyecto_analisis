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
import { removeCartItem, updateQuantity } from '../../app/cart/cartSlice';
import { CartItem as ICartItem } from '../../app/cart/types';
import { useAppDispatch } from '../../hooks/hooks';

interface CartItemProps {
  product: ICartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ product }): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Box bgColor='gray.700' padding={3} borderRadius='lg' my={3}>
      <Flex justifyContent='space-between'>
        <Image
          maxH='160px'
          maxW='160px'
          borderRadius='lg'
          src={product.images[0].url}
          alt='imagen carrito'
        />

        <Box>
          <Heading cursor='pointer' fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </Heading>
          <Text fontWeight={800} fontSize={'xl'} my={0.5}>
            ₡{product.price * product.selectedQuantity}
          </Text>
          <NumberInput
            min={1}
            defaultValue={product.selectedQuantity}
            max={product?.quantity}
            onChange={(_, value) =>
              dispatch(
                updateQuantity({ product: { ...product, selectedQuantity: value } })
              )
            }
            width='60%'
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>

        <Box margin='auto 0'>
          <CloseIcon
            onClick={() => dispatch(removeCartItem({ id: product.id }))}
            fontSize='3xl'
            cursor='pointer'
            _hover={{ color: 'red' }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

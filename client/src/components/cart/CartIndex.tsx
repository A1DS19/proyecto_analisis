import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { CartList } from './CartList';
import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { CartItem } from '../../app/cart/types';
import { Login } from '../auth/Login';
import { CheckIcon } from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';

interface CartIndexProps {}

export const CartIndex: React.FC<CartIndexProps> = (): JSX.Element => {
  const { products } = useAppSelector((state) => state.cart);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const total = (products as []).reduce((acc, curr: CartItem) => {
    return (acc += curr.price * curr.selectedQuantity);
  }, 0);

  if (!products.length) {
    return (
      <Container maxW='container.md'>
        <Box padding={5} textAlign='center' bg='gray.700' borderRadius='lg'>
          <Heading>No hay productos :(</Heading>
          <Link to='/'>
            <Text color='#3182ce' fontSize='lg'>
              Volver
            </Text>
          </Link>
        </Box>
      </Container>
    );
  }

  const handleCheckout = () => {
    if (!isAuth) {
      onOpen();
      return;
    }

    history.push('/cart/checkout');
  };

  return (
    <React.Fragment>
      <Box>
        <Container maxW='container.md'>
          <CartList products={products} />
        </Container>
        <Flex justifyContent='space-between'>
          <Stack
            fontSize='xl'
            fontWeight='bold'
            direction='row'
            bg='gray.700'
            p={5}
            borderRadius='lg'
            maxW='35%'
          >
            <Text>
              Subtotal ({products.length} {products.length > 1 ? 'items' : 'item'}):
            </Text>
            <Text color='orange.300'>₡{total}</Text>
          </Stack>
          <Tooltip
            isDisabled={!!isAuth}
            hasArrow
            label='Debe iniciar sesión para continuar'
            bg='red.600'
            color='white'
          >
            <Box
              cursor='pointer'
              borderRadius='lg'
              bg='gray.700'
              fontSize='xl'
              fontWeight='bold'
              padding={5}
              onClick={handleCheckout}
            >
              <Flex>
                <CheckIcon
                  color='green.500'
                  margin='0 auto'
                  mr={1}
                  mt={0.5}
                  fontSize='2xl'
                />
                Checkout
              </Flex>
            </Box>
          </Tooltip>
        </Flex>
      </Box>
      <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </React.Fragment>
  );
};

import {
  Center,
  Box,
  useColorModeValue,
  Stack,
  Heading,
  Avatar,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../../../app/products/types';

interface OrderItemProps {
  product: Product;
}

export const OrderItem: React.FC<OrderItemProps> = ({ product }): JSX.Element => {
  return (
    <React.Fragment>
      <Center py={3}>
        <Box
          mx={2}
          width={'445px'}
          w={'max'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Box h={'140px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
            <Image
              src={product.images[0].url}
              width='140px'
              height='140px'
              layout={'fill'}
            />
          </Box>
          <Stack>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {product.name}
            </Heading>

            <Text color={'gray.500'}>Cantidad: {product.quantity}</Text>
            <Text color={'gray.500'}>{product.description}</Text>
          </Stack>
        </Box>
      </Center>
    </React.Fragment>
  );
};

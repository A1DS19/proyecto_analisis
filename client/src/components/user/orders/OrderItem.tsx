import React from 'react';
import { Box, Text, Divider } from '@chakra-ui/react';
import { Order } from '../../../app/user/types';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { capitalizeWord } from '../../../util/functions';
import { OrderProductItem } from './OrderProductItem';
import { CheckIcon } from '@chakra-ui/icons';

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }): JSX.Element => {
  return (
    <Box my={5} padding={4} borderRadius='lg' bg='gray.700' spacing={2}>
      <Box
        textAlign='center'
        padding={3}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        fontWeight='bold'
        fontSize='large'
      >
        <Box>
          <Text>Orden creada</Text>
          <Text>
            {capitalizeWord(
              format(new Date(order.createdAt), 'MMMM dd, yyyy', {
                locale: esLocale,
              })
            )}
          </Text>
        </Box>

        <Box>
          <Text>Total</Text>
          <Text color='orange.300'>₡{order.total}</Text>
        </Box>

        <Box>
          <Text>{order.storePickup ? 'Recoje en tienda' : 'Envio a domicilio'}</Text>
          <CheckIcon color='green' fontSize='2xl' />
        </Box>

        <Box>
          <Text>Orden # {order.id}</Text>
        </Box>
      </Box>
      <Divider />
      <Box padding={3}>
        {order.products.map((product) => {
          return <OrderProductItem key={product.id} product={product} />;
        })}
      </Box>
    </Box>
  );
};

import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Text, Heading } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { CartItem } from '../../../../app/cart/types';
import { Order } from '../../../../app/user/types';

interface CompleteOrderSidebarProps {
  products: CartItem[];
  total: number;
  envio: number;
  storePickup: boolean;
  props: FormikProps<Order>;
  isFormValid: boolean;
  submitting: boolean;
}

export const CompleteOrderSidebar: React.FC<CompleteOrderSidebarProps> = ({
  products,
  total,
  envio,
  storePickup,
  props,
  isFormValid,
  submitting,
}): JSX.Element => {
  return (
    <Box bg='gray.700' padding={3} borderRadius='lg'>
      <Button
        disabled={!isFormValid}
        isLoading={submitting}
        type='submit'
        width='100%'
        leftIcon={<CheckIcon />}
        color='green.500'
        variant='outline'
      >
        Completar orden
      </Button>
      <Divider mt={3} mb={2} />
      <Heading fontSize='lg'>Resumen de orden</Heading>

      <Box my={2}>
        <Box my={1}>
          <Text>Items: ₡{total}</Text>
        </Box>
        <Box my={1}>
          <Text>Envio: ₡{storePickup ? 0 : envio}</Text>
        </Box>
      </Box>

      <Box display='flex' margin='auto 0'>
        <Heading fontSize='2xl'>Total orden:</Heading>
        <Heading color='orange.300' fontSize='2xl' margin='auto 0' ml={2}>
          ₡{total + (storePickup ? 0 : envio)}
        </Heading>
      </Box>
    </Box>
  );
};

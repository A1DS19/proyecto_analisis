import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { CartItem } from '../../../../app/cart/types';
import { Order } from '../../../../app/orders/types';
import { FormikProps } from 'formik';

interface CompleteOrderFooterProps {
  products: CartItem[];
  total: number;
  envio: number;
  storePickup: boolean;
  props: FormikProps<Order>;
  isFormValid: boolean;
}

export const CompleteOrderFooter: React.FC<CompleteOrderFooterProps> = ({
  products,
  total,
  envio,
  storePickup,
  props,
  isFormValid,
}): JSX.Element => {
  return (
    <Box my={3} bgColor='gray.700' borderRadius='lg' padding={3}>
      <Flex>
        <Box>
          <Button
            disabled={!isFormValid}
            //isLoading={loading}
            type='submit'
            leftIcon={<CheckIcon />}
            color='green.500'
            variant='outline'
          >
            Completar orden
          </Button>
        </Box>
        <Box display='flex' margin='auto 0' ml={3}>
          <Heading fontSize='large'>
            Subtotal ({products.length} {products.length > 1 ? 'items' : 'item'}):
          </Heading>
          <Heading color='orange.300' fontSize='large' margin='auto 0' ml={2}>
            ₡{total + (storePickup ? 0 : envio)}
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};

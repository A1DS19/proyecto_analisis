import {
  AccordionItem,
  AccordionButton,
  Box,
  Heading,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { Order } from '../../../../app/orders/types';
import { PaymentMethod } from '../PaymentMethod';

interface PaymentMethodProps {
  props: FormikProps<Order>;
}

export const OrderPaymentMethod: React.FC<PaymentMethodProps> = ({
  props,
}): JSX.Element => {
  return (
    <AccordionItem borderRadius='lg'>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          <Heading fontSize='large'>Método de pago</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <PaymentMethod props={props} />
      </AccordionPanel>
    </AccordionItem>
  );
};

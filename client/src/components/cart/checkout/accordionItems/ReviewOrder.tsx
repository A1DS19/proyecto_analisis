import {
  AccordionItem,
  AccordionButton,
  Box,
  Heading,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { OrderCartList } from '../reviewOrder/OrderCartList';
import React from 'react';
import { CartItem } from '../../../../app/cart/types';
import { FormikProps } from 'formik';
import { Order } from '../../../../app/orders/types';

interface ReviewOrderProps {
  products: CartItem[];
  props: FormikProps<Order>;
}

export const ReviewOrder: React.FC<ReviewOrderProps> = ({
  products,
  props,
}): JSX.Element => {
  return (
    <AccordionItem borderRadius='lg'>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          <Heading fontSize='large'>Revisar pedido</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <OrderCartList products={products} props={props} />
      </AccordionPanel>
    </AccordionItem>
  );
};

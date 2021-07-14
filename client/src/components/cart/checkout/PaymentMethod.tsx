import { Center, Flex, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FormikProps } from 'formik/dist/types';
import React from 'react';
import { Order } from '../../../app/user/types';

interface PaymentMethodProps {
  props: FormikProps<Order>;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ props }): JSX.Element => {
  return (
    <Center>
      <RadioGroup
        name='paymentMethod'
        onChange={(e) => {
          props.setFieldValue('paymentMethod', e);
        }}
        onBlur={props.handleBlur}
        value={props.values.paymentMethod}
      >
        <Stack direction='row'>
          <Flex>
            <Image src='/sinpeMovil.png' alt='SINPE MOVIL' boxSize='50px' />
            <Radio value='SINPE'>Sinpe Móvil</Radio>
          </Flex>
          {!props.values.address && (
            <Flex>
              <Image src='/store.svg' alt='SINPE MOVIL' boxSize='50px' />
              <Radio value='TIENDA_FISICA'>Pago en tienda</Radio>
            </Flex>
          )}
        </Stack>
      </RadioGroup>
    </Center>
  );
};

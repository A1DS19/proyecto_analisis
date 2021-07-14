import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormikProps } from 'formik';
import { Order } from '../../../../app/user/types';
import { AddressForm } from '../AddressForm';

interface ShippingAddressProps {
  props: FormikProps<Order>;
  setStorePickup: (input: boolean) => void;
  storePickup: boolean;
  isFormValid: boolean;
  setIsFormValid: (input: boolean) => void;
}

export const ShippingAddress: React.FC<ShippingAddressProps> = ({
  props,
  setStorePickup,
  storePickup,
  isFormValid,
  setIsFormValid,
}): JSX.Element => {
  React.useEffect(() => {
    setIsFormValid(
      storePickup ? true : !storePickup && !!props.values.address?.direccionExacta
    );
  }, [storePickup, props, setIsFormValid]);

  return (
    <AccordionItem borderRadius='lg'>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          <Heading fontSize='large' display='flex'>
            Dirección de envío
            {storePickup
              ? null
              : !isFormValid && (
                  <Text ml={3} color='red'>
                    Debe agregar todos los campos
                  </Text>
                )}
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <RadioGroup
          onChange={() => {
            setStorePickup(!storePickup);

            props.setFieldValue('storePickup', JSON.stringify(storePickup));

            if (JSON.parse(props.values.storePickup)) {
              props.setFieldValue('address', null);
            }
          }}
          value={JSON.stringify(storePickup)}
        >
          <Stack direction='row'>
            <Radio value='true'>Recojer en tienda</Radio>
            <Radio value='false'>Enviar a casa</Radio>
          </Stack>
        </RadioGroup>
        {!storePickup && <AddressForm props={props} />}
      </AccordionPanel>
    </AccordionItem>
  );
};

import {
  Accordion,
  Container,
  Heading,
  Grid,
  GridItem,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { CompleteOrderFooter } from './footer-sidebar/CompleteOrderFooter';
import { CompleteOrderSidebar } from './footer-sidebar/CompleteOrderSidebar';
import { useHistory } from 'react-router-dom';
import { CartItem } from '../../../app/cart/types';
import { useAppSelector } from '../../../hooks/hooks';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { Order } from '../../../app/user/types';
import { OrderPaymentMethod } from './accordionItems/OrderPaymentMethod';
import { ReviewOrder } from './accordionItems/ReviewOrder';
import { ShippingAddress } from './accordionItems/ShippingAddress';
import { Persist } from 'formik-persist';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../app/user/orderActions';
import { CreateOrderSuccess } from './CreateOrderSuccess';

interface CheckoutIndexProps {}

export const CheckoutIndex: React.FC<CheckoutIndexProps> = (): JSX.Element => {
  const envio = 5000;
  const dispatch = useDispatch();
  const [storePickup, setStorePickup] = React.useState(true);
  const { products } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const total = (products as []).reduce((acc, curr: CartItem) => {
    return (acc += curr.price * curr.selectedQuantity);
  }, 0);

  const initialValues: Partial<Order> = {
    userId: user?.id!,
    total: storePickup ? total + envio : total,
    productIds: (products as any).map((prod: CartItem) => prod.id),
    paymentMethod: 'SINPE',
    storePickup: JSON.stringify(storePickup),
    address: null,
  };

  return (
    <Container maxW='container.lg'>
      <Center mb={3}>
        <Heading size='lg'>
          Checkout ({products.length} {products.length > 1 ? 'items' : 'item'})
        </Heading>
      </Center>
      <Formik
        initialValues={initialValues as Order}
        onSubmit={(values: Order, helpers: FormikHelpers<Order>) => {
          setSubmitting(true);
          dispatch(
            createOrder({
              body: values,
              callback: () => {
                setSubmitting(false);
                onOpen();
              },
            })
          );
        }}
      >
        {(props: FormikProps<Order>) => {
          return (
            <Form>
              <Grid templateColumns='repeat(5, 1fr)'>
                <GridItem colSpan={3}>
                  <Accordion
                    defaultIndex={[0]}
                    allowToggle
                    bg='gray.700'
                    borderRadius='lg'
                  >
                    <ShippingAddress
                      props={props}
                      setStorePickup={setStorePickup}
                      storePickup={storePickup}
                      isFormValid={isFormValid}
                      setIsFormValid={setIsFormValid}
                    />

                    <OrderPaymentMethod props={props} />

                    <ReviewOrder products={products} props={props} />
                  </Accordion>

                  <CompleteOrderFooter
                    products={products}
                    total={total}
                    envio={envio}
                    storePickup={storePickup}
                    props={props}
                    isFormValid={isFormValid}
                    submitting={submitting}
                  />
                </GridItem>

                <GridItem colSpan={2} mx={3}>
                  <CompleteOrderSidebar
                    products={products}
                    total={total}
                    envio={envio}
                    storePickup={storePickup}
                    props={props}
                    isFormValid={isFormValid}
                    submitting={submitting}
                  />
                </GridItem>
              </Grid>
              <Persist name='orderForm' />
            </Form>
          );
        }}
      </Formik>
      <CreateOrderSuccess isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

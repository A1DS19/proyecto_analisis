import { Accordion, Container, Heading, Grid, GridItem, Center } from '@chakra-ui/react';
import React from 'react';
import { CompleteOrderFooter } from './footer-sidebar/CompleteOrderFooter';
import { CompleteOrderSidebar } from './footer-sidebar/CompleteOrderSidebar';
import { useHistory } from 'react-router-dom';
import { CartItem } from '../../../app/cart/types';
import { useAppSelector } from '../../../hooks/hooks';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { Order } from '../../../app/orders/types';
import { OrderPaymentMethod } from './accordionItems/OrderPaymentMethod';
import { ReviewOrder } from './accordionItems/ReviewOrder';
import { ShippingAddress } from './accordionItems/ShippingAddress';
import { Persist } from 'formik-persist';

interface CheckoutIndexProps {}

export const CheckoutIndex: React.FC<CheckoutIndexProps> = (): JSX.Element => {
  const envio = 5000;
  const history = useHistory();
  const [storePickup, setStorePickup] = React.useState(true);
  const { products } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const [isFormValid, setIsFormValid] = React.useState(true);
  const total = (products as []).reduce((acc, curr: CartItem) => {
    return (acc += curr.price * curr.selectedQuantity);
  }, 0);

  const initialValues: Order = {
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
        initialValues={initialValues}
        onSubmit={(values: Order, helpers: FormikHelpers<Order>) => {
          console.log(values);
          history.push('/cart/checkout/success');
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
                  />
                </GridItem>
              </Grid>
              <Persist name='orderForm' />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

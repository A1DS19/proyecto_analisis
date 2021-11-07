import React from 'react';
import {
  Box,
  Text,
  Divider,
  Heading,
  Collapse,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Order } from '../../../app/user/types';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { capitalizeWord } from '../../../util/functions';
import { OrderProductItem } from './OrderProductItem';
import { CheckIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { AlertModal } from '../../common/AlertModal';
import { useAppDispatch } from '../../../hooks/hooks';
import { updateOrderState as updateOrderStateAction } from '../../../app/admin/adminActions';

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }): JSX.Element => {
  const [show, setShow] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const dispatch = useAppDispatch();
  const handleToggle = () => setShow(!show);

  const renderProducts = (): JSX.Element[] => {
    return order.products.map((product) => {
      return <OrderProductItem key={product.id} product={product} />;
    });
  };

  const updateOrderState = () => {
    const newOrderValues = {
      ...selectedOrder,
      isDelivered: 'true',
    };
    dispatch(
      updateOrderStateAction({ id: newOrderValues.id!, input: newOrderValues as Order })
    );
  };

  const renderUserAddress = (): JSX.Element | null => {
    if (!JSON.parse(order.storePickup)) {
      return (
        <React.Fragment>
          <Heading size='md'>Dirección de envio</Heading>
          <Box my={1}>
            <Flex>
              <Heading size='sm'>Provincia:</Heading>
              <Text mt='-0.5' mx='1'>
                {order.address?.provincia}
              </Text>
            </Flex>
            <Flex>
              <Heading size='sm'>Cantón:</Heading>
              <Text mt='-0.5' mx='1'>
                {order.address?.canton}
              </Text>
            </Flex>
            <Flex>
              <Heading size='sm'>Distrito:</Heading>
              <Text mt='-0.5' mx='1'>
                {order.address?.distrito}
              </Text>
            </Flex>
            <Flex>
              <Heading size='sm'>Dirección exacta:</Heading>
              <Text mt='-0.5' mx='1'>
                {order.address?.direccionExacta}
              </Text>
            </Flex>
          </Box>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  const renderUserDetails = (): JSX.Element => {
    const { userId } = order;
    return (
      <React.Fragment>
        <Heading size='md'>Detalles de usuario</Heading>
        <Flex my={1}>
          <Heading size='sm'>Nombre:</Heading>
          <Text mt='-0.5' mx='1'>
            {(userId as any).name}
          </Text>
        </Flex>
        <Flex my={1}>
          <Heading size='sm'>Apellido:</Heading>
          <Text mt='-0.5' mx='1'>
            {(userId as any).lastName}
          </Text>
        </Flex>
        <Flex my={1}>
          <Heading size='sm'>Cedula:</Heading>
          <Text mt='-0.5' mx='1'>
            {(userId as any).idNumber}
          </Text>
        </Flex>
        <Flex my={1}>
          <Heading size='sm'>Numero telefonico:</Heading>
          <Text mt='-0.5' mx='1'>
            {(userId as any).phoneNumber}
          </Text>
        </Flex>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
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
            <Text>
              {JSON.parse(order.storePickup) ? 'Recoje en tienda' : 'Envio a domicilio'}
            </Text>
            <CheckIcon color='green' fontSize='2xl' />
          </Box>

          <Box>
            <Text>Metodo de pago</Text>
            <Text color='orange.300'>{order.paymentMethod.replaceAll('_', ' ')}</Text>
          </Box>

          <Box>
            <Text>Orden entregada</Text>
            <Text color='orange.300'>
              {JSON.parse(order.isDelivered) ? (
                <CheckIcon color='green' fontSize='2xl' />
              ) : (
                <CloseIcon
                  cursor='pointer'
                  color='red'
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsOpen(true);
                  }}
                />
              )}
            </Text>
          </Box>

          <Box>
            <Text>Orden # {order.id}</Text>
          </Box>
        </Box>
        <Divider />
        <Box padding={3}>
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <GridItem>
              {order.products.length > 1 ? (
                <React.Fragment>
                  <Collapse startingHeight={86} in={show}>
                    {renderProducts()}
                  </Collapse>
                  <Flex cursor='pointer' onClick={handleToggle}>
                    <Heading size='md'>Ver todos los productos</Heading>
                    <ChevronRightIcon margin='auto 0' fontSize='large' />
                  </Flex>
                </React.Fragment>
              ) : (
                renderProducts()
              )}
            </GridItem>
            <GridItem>{renderUserAddress()}</GridItem>
            <GridItem>{renderUserDetails()}</GridItem>
          </Grid>
        </Box>
      </Box>
      <AlertModal
        header='Actualizar order'
        message={`Esta seguro que actualizar estado de orden #${selectedOrder?.id} a entregada?`}
        mainActionTxt='Actualizar'
        mainAction={updateOrderState}
        cancelRef={cancelRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </React.Fragment>
  );
};

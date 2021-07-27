import { Box, Button, Center, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { filter_order } from './OrdersIndex';

interface OrderFilterProps {
  setFilter: (filter: filter_order) => void;
  filter: string | null;
}

export const OrderFilter: React.FC<OrderFilterProps> = ({
  filter,
  setFilter,
}): JSX.Element => {
  return (
    <Container maxW='container.sm' bg='gray.700' padding={3} borderRadius='lg'>
      <Center>
        <Heading size='lg'>Filtros</Heading>
      </Center>
      <Box textAlign='center'>
        <Button
          size='sm'
          padding={2}
          margin={2}
          onClick={() => setFilter('todas')}
          bg={filter === 'todas' ? 'gray.400' : 'gray.600'}
        >
          Todas
        </Button>
        <Button
          size='sm'
          padding={2}
          margin={2}
          onClick={() => setFilter('por_entregar')}
          bg={filter === 'por_entregar' ? 'gray.400' : 'gray.600'}
        >
          Por entregar
        </Button>
        <Button
          size='sm'
          padding={2}
          margin={2}
          onClick={() => setFilter('entregada')}
          bg={filter === 'entregada' ? 'gray.400' : 'gray.600'}
        >
          Entregada
        </Button>
      </Box>
    </Container>
  );
};

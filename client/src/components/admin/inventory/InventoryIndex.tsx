import { Alert, AlertIcon, Box, Button, Spinner } from '@chakra-ui/react';
import React from 'react';
import { fetchProducts } from '../../../app/admin/adminActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { SearchProduct } from './SearchProduct';
import { InventoryTable } from './InventoryTable';
import { AddIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

interface InventoryIndexProps {}

export const InventoryIndex: React.FC<InventoryIndexProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { inventory, loading, error } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchProducts({ category: '', page: 0, limit: 10000 }));
  }, [dispatch]);

  return (
    <Box>
      <Box maxW='30%' my={3}>
        <SearchProduct />
      </Box>

      {error && (
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Alert status='warning' borderRadius='lg' maxW='30%'>
            <AlertIcon />
            {error}
          </Alert>
        </Box>
      )}

      {!loading && !error ? (
        <React.Fragment>
          <InventoryTable inventory={inventory} />
          <Box my={4}>
            <Button
              onClick={() => history.push('/admin/inventory')}
              leftIcon={<AddIcon />}
              color='orange.300'
              variant='outline'
            >
              Agregar
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        !error && (
          <Box display='flex' marginY={5} alignItems='center' justifyContent='center'>
            <Spinner size='lg' />
          </Box>
        )
      )}
    </Box>
  );
};

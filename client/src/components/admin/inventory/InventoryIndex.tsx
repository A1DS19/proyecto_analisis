import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { fetchProducts } from '../../../app/admin/adminActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { FullSpinner } from '../../common/FullSpinner';
import { SearchProduct } from './SearchProduct';
import { InventoryTable } from './InventoryTable';
import { AddIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

interface InventoryIndexProps {}

export const InventoryIndex: React.FC<InventoryIndexProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { inventory, loading } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchProducts({ category: '', page: 0, limit: 10000 }));
  }, [dispatch]);

  if (loading) return <FullSpinner />;

  return (
    <Box>
      <Box maxW='30%' my={3}>
        <SearchProduct />
      </Box>
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
    </Box>
  );
};

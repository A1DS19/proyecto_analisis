import React from 'react';
import { fetchProducts } from '../../../app/admin/adminActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { FullSpinner } from '../../common/FullSpinner';
import { PromotionsTable } from './PromotionsTable';
import { Box } from '@chakra-ui/react';

interface PromotionsIndexProps {}

export const PromotionsIndex: React.FC<PromotionsIndexProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { inventory, loading } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchProducts(''));
  }, [dispatch]);

  if (loading) return <FullSpinner />;

  return (
    <Box>
      {/* <Box maxW='30%' my={3}>
        <SearchProduct />
      </Box> */}
      <PromotionsTable
        discountedInventory={inventory.filter((product) => product.isDiscounted === true)}
        inventory={inventory}
      />
    </Box>
  );
};

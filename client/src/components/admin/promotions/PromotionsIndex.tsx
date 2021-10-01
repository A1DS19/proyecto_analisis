import React from 'react';
import { fetchAllPromotions } from '../../../app/admin/actions/promotions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { FullSpinner } from '../../common/FullSpinner';
import { PromotionsTable } from './PromotionsTable';
import { Box } from '@chakra-ui/react';

interface PromotionsIndexProps {}

export const PromotionsIndex: React.FC<PromotionsIndexProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { inventory, loading, discountedProducts } = useAppSelector(
    (state) => state.admin
  );

  React.useEffect(() => {
    dispatch(fetchAllPromotions());
  }, [dispatch]);

  if (loading) return <FullSpinner />;

  return (
    <Box>
      {/* <Box maxW='30%' my={3}>
        <SearchProduct />
      </Box> */}
      <PromotionsTable discountedInventory={discountedProducts} inventory={inventory} />
    </Box>
  );
};

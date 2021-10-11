import { Alert, AlertIcon, Box, Grid } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../app/products/types';
import { ProductItem } from './ProductItem';
import { FullSpinner } from '../common/FullSpinner';

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
}): JSX.Element => {
  if (loading) return <FullSpinner />;

  if (products.length === 0) {
    return (
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Alert status='warning' borderRadius='lg' maxW='40%'>
          <AlertIcon />
          {'No hay productos en esta categoria!'}
        </Alert>
      </Box>
    );
  }

  const renderProducts = () => {
    return products.map((product) => {
      return <ProductItem key={product.id} product={product} />;
    });
  };

  return (
    <React.Fragment>
      <Grid templateColumns='repeat(3, 1fr)' gap={6} my={5}>
        {renderProducts()}
      </Grid>
    </React.Fragment>
  );
};

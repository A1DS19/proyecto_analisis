import React from 'react';
import { fetchProducts } from '../app/products/productActions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ProductList } from './products/ProductList';
import { ProductFilter } from './products/ProductFilter';
import { Box } from '@chakra-ui/react';

interface IndexProps {}

export const Index: React.FC<IndexProps> = (): JSX.Element => {
  const { products, loading } = useAppSelector((state) => state.product);
  const [filter, setFilter] = React.useState('');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts(filter));
  }, [dispatch, filter]);

  return (
    <React.Fragment>
      <Box mt={3} mb={10}>
        <ProductFilter setFilter={setFilter} filter={filter} />
      </Box>
      <Box mb={10}>
        <ProductList products={products} loading={loading} />
      </Box>
    </React.Fragment>
  );
};

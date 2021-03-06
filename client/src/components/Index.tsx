import React from 'react';
import { fetchProducts } from '../app/products/productActions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ProductList } from './products/ProductList';
import { ProductFilter } from './products/ProductFilter';
import { Alert, AlertIcon, Box, Button, Center, Spinner } from '@chakra-ui/react';
import { ProductPromotions } from './products/discountedProducts/ProductPromotions';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { nextPage } from '../app/products/productSlice';

interface IndexProps {}

export const Index: React.FC<IndexProps> = (): JSX.Element => {
  const { products, loading, limit, currentPage, totalPages, error } = useAppSelector(
    (state) => state.product
  );
  const [filter, setFilter] = React.useState('');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts({ category: filter, page: currentPage, limit: limit }));
  }, [dispatch, filter, currentPage, limit]);

  const renderPaginationState = () => {
    if (!loading && totalPages !== currentPage) {
      return (
        <Button
          onClick={() => {
            dispatch(nextPage());
          }}
          leftIcon={<AddIcon />}
        >
          Ver más
        </Button>
      );
    } else if (loading) {
      return <Spinner />;
    } else if (!loading && totalPages === currentPage) {
      return (
        <Alert maxW='40%' status='info' borderRadius='lg'>
          <AlertIcon />
          Ya no hay más productos!
        </Alert>
      );
    }
  };

  return (
    <React.Fragment>
      <Box mt={3} mb={10}>
        <ProductFilter setFilter={setFilter} filter={filter} />
      </Box>
      <Box mt={3} mb={10}>
        {(!error || products.length > 0) && <ProductPromotions filter={filter} />}
      </Box>
      <Box mb={10}>
        {!error || products.length > 0 ? (
          <ProductList products={products} loading={loading} />
        ) : (
          <React.Fragment>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <Alert status='warning' borderRadius='lg' maxW='30%'>
                <AlertIcon />
                {error}
              </Alert>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <Button
                my={1}
                size='md'
                leftIcon={<ArrowBackIcon />}
                onClick={() =>
                  dispatch(
                    fetchProducts({ category: filter, page: currentPage, limit: limit })
                  )
                }
              >
                Volver
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      <Center my={5}>{products.length > 1 && renderPaginationState()}</Center>
    </React.Fragment>
  );
};

import React from 'react';
import { fetchProducts } from '../app/products/productActions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ProductList } from './products/ProductList';
import { ProductFilter } from './products/ProductFilter';

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
      <ProductFilter setFilter={setFilter} filter={filter} />
      <ProductList products={products} loading={loading} />
    </React.Fragment>
  );
};

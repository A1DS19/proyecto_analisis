import React from 'react';
import { fetchProducts } from '../app/products/productActions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ProductList } from './products/ProductList';

interface IndexProps {}

export const Index: React.FC<IndexProps> = (): JSX.Element => {
  const { products, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <ProductList products={products} loading={loading} />
    </React.Fragment>
  );
};

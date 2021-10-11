import React from 'react';
import { Center, Container, Heading } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ProductDiscountList } from './ProductDiscountList';
import { fetchAllPromotions } from '../../../app/products/productActions';

interface ProductPromotionsProps {
  filter: string;
}

export const ProductPromotions: React.FC<ProductPromotionsProps> = ({
  filter,
}): JSX.Element => {
  const { discountedProducts } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAllPromotions({ category: filter }));
  }, [dispatch, filter]);

  return (
    <React.Fragment>
      {discountedProducts.length !== 0 && (
        <Container maxW='container.lg' bg='gray.700' padding={3} borderRadius='lg'>
          <Center mb={3}>
            <Heading size='lg'>
              Promociones {filter !== '' && `en ${filter.replaceAll('_', ' ')}`}
            </Heading>
          </Center>

          <ProductDiscountList products={discountedProducts} />
        </Container>
      )}
    </React.Fragment>
  );
};

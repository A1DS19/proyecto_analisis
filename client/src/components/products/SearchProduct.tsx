import React from 'react';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProducts } from '../../app/products/productActions';
import debounce from 'lodash.debounce';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { fetchProductByName } from '../../app/products/productActions';
import { clearPagination } from '../../app/products/productSlice';

interface SearchProductProps {}

interface SearchProductInput {
  product: string;
}

export const SearchProduct: React.FC<SearchProductProps> = (): JSX.Element => {
  const { limit, currentPage, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const initialValues: SearchProductInput = {
    product: '',
  };

  const debouncedCallback = React.useCallback(
    debounce((name: string) => {
      dispatch(
        fetchProductByName({
          name,
        })
      );
    }, 1000),
    [dispatch]
  );

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: SearchProductInput,
          helpers: FormikHelpers<SearchProductInput>
        ) => {
          debouncedCallback(values.product);

          if (values.product === '') {
            dispatch(clearPagination());
            dispatch(fetchProducts({ category: '', page: currentPage, limit }));
          }
        }}
      >
        {(props: FormikProps<SearchProductInput>) => {
          return (
            <Form>
              <Box display='flex'>
                <Input
                  name='product'
                  value={props.values.product}
                  onChange={(e) => {
                    props.handleChange(e);
                    props.submitForm();
                  }}
                  onBlur={props.handleBlur}
                  size='md'
                  placeholder='Buscar producto'
                  focusBorderColor='gray.500'
                />
                {loading && <Spinner margin='auto 0' ml={2} />}
              </Box>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

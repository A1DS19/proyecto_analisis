import React from 'react';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProducts } from '../../app/products/productActions';
import debounce from 'lodash.debounce';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { fetchProductByName } from '../../app/products/productActions';

interface SearchProductProps {}

interface SearchProductInput {
  product: string;
}

export const SearchProduct: React.FC<SearchProductProps> = (): JSX.Element => {
  const { limit, currentPage } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const initialValues: SearchProductInput = {
    product: '',
  };

  const debouncedCallback = React.useCallback(
    debounce((name: string, helpers: FormikHelpers<SearchProductInput>) => {
      !!name && name.length > 0
        ? dispatch(
            fetchProductByName({
              name,
              callback: () => {
                helpers.setSubmitting(false);
              },
            })
          )
        : dispatch(
            fetchProducts({
              category: '',
              page: currentPage,
              limit,
              callback: () => {
                helpers.setSubmitting(false);
              },
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
          debouncedCallback(values.product, helpers);
        }}
      >
        {(props: FormikProps<SearchProductInput>) => {
          return (
            <Form>
              <Box display='flex'>
                <Input
                  name='product'
                  value={props.values.product}
                  onChange={async (e) => {
                    props.handleChange(e);
                    await props.submitForm();
                  }}
                  onBlur={props.handleBlur}
                  size='md'
                  placeholder='Buscar producto'
                  focusBorderColor='gray.500'
                />
                {props.isSubmitting && <Spinner margin='auto 0' ml={2} />}
              </Box>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

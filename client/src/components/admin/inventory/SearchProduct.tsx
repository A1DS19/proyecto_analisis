import React from 'react';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchProduct, fetchProducts } from '../../../app/admin/adminActions';
import debounce from 'lodash.debounce';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

interface SearchProductProps {}

interface SearchProductInput {
  product: string;
}

export const SearchProduct: React.FC<SearchProductProps> = (): JSX.Element => {
  const { error } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const initialValues: SearchProductInput = {
    product: '',
  };

  const debouncedCallback = React.useCallback(
    debounce((name: string, helpers: FormikHelpers<SearchProductInput>) => {
      !!name && name.length > 0
        ? dispatch(
            fetchProduct({
              name,
              callback: () => {
                helpers.setSubmitting(false);
              },
            })
          )
        : dispatch(
            fetchProducts({
              category: '',
              page: 0,
              limit: 1000,
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
                  onChange={(e) => {
                    props.handleChange(e);
                    props.submitForm();
                  }}
                  onBlur={props.handleBlur}
                  size='md'
                  placeholder='Buscar producto'
                  focusBorderColor='gray.500'
                />
                {!error && props.isSubmitting && <Spinner margin='auto 0' ml={2} />}
              </Box>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

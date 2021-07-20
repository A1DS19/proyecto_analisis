import React from 'react';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { useAppDispatch } from '../../../hooks/hooks';
import { fetchProduct, fetchProducts } from '../../../app/admin/adminActions';
import debounce from 'lodash.debounce';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

interface SearchProductProps {}

interface SearchProductInput {
  product: string;
}

export const SearchProduct: React.FC<SearchProductProps> = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const initialValues: SearchProductInput = {
    product: '',
  };

  const debouncedCallback = React.useCallback(
    debounce((name: string) => {
      dispatch(
        fetchProduct({
          name,
          callback: () => {
            setLoading(false);
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
          setLoading(true);
          debouncedCallback(values.product);

          if (values.product === '') {
            dispatch(fetchProducts(''));
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

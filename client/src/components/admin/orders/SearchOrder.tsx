import React from 'react';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { useAppDispatch } from '../../../hooks/hooks';
import { fetchOrderById, fetchOrders } from '../../../app/admin/adminActions';
import debounce from 'lodash.debounce';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

interface SearchOrderProps {}

interface SearchOrderInput {
  id: string;
}

export const SearchOrder: React.FC<SearchOrderProps> = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const initialValues: SearchOrderInput = {
    id: '',
  };

  const debouncedCallback = React.useCallback(
    debounce((id: string) => {
      setLoading(true);

      !!id && id.length > 0
        ? dispatch(
            fetchOrderById({
              id,
              callback: () => {
                setLoading(false);
              },
            })
          )
        : dispatch(
            fetchOrders({
              filter: 'todas',
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
          values: SearchOrderInput,
          helpers: FormikHelpers<SearchOrderInput>
        ) => {
          debouncedCallback(values.id);
        }}
      >
        {(props: FormikProps<SearchOrderInput>) => {
          return (
            <Form>
              <Box display='flex'>
                <Input
                  name='id'
                  value={props.values.id}
                  onChange={(e) => {
                    props.handleChange(e);
                    props.submitForm();
                  }}
                  onBlur={props.handleBlur}
                  size='md'
                  placeholder='Buscar orden por id'
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

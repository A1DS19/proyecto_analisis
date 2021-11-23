import React from 'react';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { useAppDispatch } from '../../../hooks/hooks';
import { fetchUserByIdNumber, fetchUsers } from '../../../app/admin/adminActions';
import debounce from 'lodash.debounce';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

interface SearchUserProps {}

interface SearchUserInput {
  idNumber: string;
}

export const SearchUser: React.FC<SearchUserProps> = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const initialValues: SearchUserInput = {
    idNumber: '',
  };

  const debouncedCallback = React.useCallback(
    debounce((idNumber: string) => {
      setLoading(true);
      !!idNumber && idNumber.length > 0
        ? dispatch(
            fetchUserByIdNumber({
              idNumber,
              callback: () => {
                setLoading(false);
              },
            })
          )
        : dispatch(
            fetchUsers({
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
        onSubmit={(values: SearchUserInput, helpers: FormikHelpers<SearchUserInput>) => {
          debouncedCallback(values.idNumber);
        }}
      >
        {(props: FormikProps<SearchUserInput>) => {
          return (
            <Form>
              <Box display='flex'>
                <Input
                  name='idNumber'
                  value={props.values.idNumber}
                  onChange={(e) => {
                    props.handleChange(e);
                    props.submitForm();
                  }}
                  onBlur={props.handleBlur}
                  size='md'
                  placeholder='Buscar usuario por cédula'
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

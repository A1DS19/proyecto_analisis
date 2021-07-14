import React from 'react';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

interface SearchProductProps {}

interface FormInput {
  product: string;
}

export const SearchProduct: React.FC<SearchProductProps> = (): JSX.Element => {
  const initialValues: FormInput = {
    product: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: FormInput, helpers: FormikHelpers<FormInput>) => {
          if (!values.product) {
            helpers.setSubmitting(false);
            return;
          }

          helpers.setSubmitting(true);
          setTimeout(() => {
            console.log(values);
            helpers.setSubmitting(false);
          }, 500);
        }}
      >
        {(props: FormikProps<FormInput>) => {
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
                {props.isSubmitting && <Spinner margin='auto 0' ml={2} />}
              </Box>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

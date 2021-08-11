import React from 'react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

interface ForgotPasswordProps {}

interface PassInput {
  email: string;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = (): JSX.Element => {
  const initialValues: PassInput = {
    email: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: PassInput, helpers: FormikHelpers<PassInput>) => {
          console.log(values);
        }}
      >
        {(props: FormikProps<PassInput>) => {
          return (
            <Form>
              <Container maxWidth='container.sm'>
                <Heading my={3} size='lg'>
                  Olvide mi contraseña
                </Heading>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder='Email'
                    name='email'
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {/* <ErrorMessage name='email' component={ErrorMessageForm} /> */}
                </FormControl>

                <Button
                  my={3}
                  type='submit'
                  disabled={!props.isValid || !props.dirty}
                  isLoading={props.isSubmitting}
                  colorScheme='blue'
                  mr={3}
                >
                  Submit
                </Button>
                <Button>Cancelar</Button>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

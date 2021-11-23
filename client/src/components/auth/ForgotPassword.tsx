import React from 'react';
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { requestPasswordReset as requestPasswordResetAction } from '../../app/user/userActions';
import { requestPasswordReset } from '../common/validationSchemas/authValidation';
import { ErrorMessageForm } from '../common/ErrorMessageForm';
import { useHistory } from 'react-router';

interface ForgotPasswordProps {}

interface PassInput {
  email: string;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = (): JSX.Element => {
  const [emailSent, setEmailSent] = React.useState(false);
  const history = useHistory();
  const initialValues: PassInput = {
    email: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={requestPasswordReset}
        onSubmit={async (values: PassInput, helpers: FormikHelpers<PassInput>) => {
          helpers.setSubmitting(true);

          await requestPasswordResetAction(values.email);

          setEmailSent(true);
          helpers.setSubmitting(false);
          helpers.resetForm();
        }}
      >
        {(props: FormikProps<PassInput>) => {
          return (
            <Form>
              <Container maxWidth='container.sm'>
                <Heading my={3} size='lg'>
                  Olvidé mi contraseña
                </Heading>

                {emailSent && (
                  <Alert my={4} status='info' borderRadius='lg'>
                    <AlertIcon />
                    Si el email existe se enviara un correo con los pasos para reiniciar
                    la contraseña
                  </Alert>
                )}

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder='Email'
                    name='email'
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <ErrorMessage name='email' component={ErrorMessageForm} />
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
                <Button onClick={() => history.push('/')}>
                  {!emailSent ? 'Cancelar' : 'Volver'}
                </Button>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

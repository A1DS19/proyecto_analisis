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
import { passwordReset } from '../common/validationSchemas/authValidation';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorMessageForm } from '../common/ErrorMessageForm';
import { resetPassword } from '../../app/user/userActions';

interface ResetPasswordProps {}

interface PassInput {
  password: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC<ResetPasswordProps> = (): JSX.Element => {
  const [msg, setMsg] = React.useState('');
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const initialValues: PassInput = {
    password: '',
    confirmPassword: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={passwordReset}
        onSubmit={async (values: PassInput, helpers: FormikHelpers<PassInput>) => {
          const data = {
            password: values.password,
            token,
          };
          helpers.setSubmitting(true);

          const msg = await resetPassword({ body: data });
          setMsg(msg);

          helpers.setSubmitting(false);
          helpers.resetForm();
        }}
      >
        {(props: FormikProps<PassInput>) => {
          return (
            <Form>
              <Container maxWidth='container.sm'>
                <Heading my={3} size='lg'>
                  Restablecer contraseña
                </Heading>

                {msg && (
                  <Alert my={4} status='info' borderRadius='lg'>
                    <AlertIcon />
                    {msg}
                  </Alert>
                )}

                <FormControl mt={4}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    placeholder='Contraseña'
                    type='password'
                    name='password'
                    value={props.values.password}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <ErrorMessage name='password' component={ErrorMessageForm} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Repetir Contraseña</FormLabel>
                  <Input
                    placeholder='Repetir Contraseña'
                    type='password'
                    name='confirmPassword'
                    value={props.values.confirmPassword}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <ErrorMessage name='confirmPassword' component={ErrorMessageForm} />
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
                  {!msg ? 'Cancelar' : 'Volver'}
                </Button>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

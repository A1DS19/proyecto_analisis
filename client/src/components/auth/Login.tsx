import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Box,
} from '@chakra-ui/react';
import { ErrorMessageForm } from '../common/ErrorMessageForm';
import { Formik, FormikHelpers, Form, ErrorMessage, FormikProps } from 'formik';
import { FunctionComponent } from 'react';
import { loginValidationSchema } from '../common/validationSchemas/authValidation';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login, me } from '../../app/user/userActions';
import { clearErrorMessage } from '../../app/user/userSlice';

interface loginProps {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const Login: FunctionComponent<loginProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const initialValues: LoginInput = {
    email: '',
    password: '',
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Iniciar Sesión</ModalHeader>
          <ModalCloseButton onClick={() => dispatch(clearErrorMessage())} />
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values: LoginInput, helpers: FormikHelpers<LoginInput>) => {
              try {
                await dispatch(login(values));
                await dispatch(
                  me({
                    callback: () => {
                      dispatch(clearErrorMessage());
                      onClose();
                    },
                  })
                );
              } catch (error: any) {
                console.log(error.message);
              }
            }}
          >
            {(props: FormikProps<LoginInput>) => {
              return (
                <Form>
                  <ModalBody pb={6}>
                    {error && <ErrorMessageForm>{error}</ErrorMessageForm>}
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

                    <FormControl mt={4}>
                      <FormLabel>Contraseña</FormLabel>
                      <Input
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        value={props.values.password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='password' component={ErrorMessageForm} />
                    </FormControl>

                    <Box mt={1}>
                      <Link href='/auth/forgot_password' color='blue.400'>
                        Olvidé mi contraseña
                      </Link>
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      type='submit'
                      disabled={!props.isValid || !props.dirty}
                      isLoading={loading}
                      colorScheme='blue'
                      mr={3}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        onClose();
                        dispatch(clearErrorMessage());
                      }}
                    >
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

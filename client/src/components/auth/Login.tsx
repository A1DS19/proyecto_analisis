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
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../app/auth/authActions';

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
  const { loading, error } = useAppSelector((state) => state.auth);
  const initialValues: LoginInput = {
    email: '',
    password: '',
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Iniciar Sesion</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values: LoginInput, helpers: FormikHelpers<LoginInput>) => {
              await dispatch(login(values));
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
                      <Link href='/auth/forgot-password' color='blue.400'>
                        Olvide mi contraseña
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
                    <Button onClick={onClose}>Cancelar</Button>
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

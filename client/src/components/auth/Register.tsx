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
} from '@chakra-ui/react';
import { ErrorMessageForm } from '../../components/common/ErrorMessageForm';
import { Formik, Form, FormikProps, FormikHelpers, ErrorMessage } from 'formik';
import { FunctionComponent } from 'react';
import { registerValidationSchema } from '../common/validationSchemas/authValidation';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { me, register } from '../../app/user/userActions';
import { clearErrorMessage } from '../../app/user/userSlice';

interface registerProps {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface RegisterInput {
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  idNumber: string;
  password: string;
  confirmPassword?: string;
}

export const Register: FunctionComponent<registerProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.user);
  const initialValues: RegisterInput = {
    email: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Cuenta</ModalHeader>
          <ModalCloseButton onClick={() => dispatch(clearErrorMessage())} />

          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={async (
              values: RegisterInput,
              helpers: FormikHelpers<RegisterInput>
            ) => {
              try {
                await dispatch(register(values));
                await dispatch(
                  me({
                    callback: () => {
                      dispatch(clearErrorMessage());
                      onClose();
                    },
                  })
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(props: FormikProps<RegisterInput>) => {
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
                      <FormLabel>Primer nombre</FormLabel>
                      <Input
                        placeholder='Nombre'
                        name='name'
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='name' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Primer apellido</FormLabel>
                      <Input
                        placeholder='Apellido'
                        name='lastName'
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='lastName' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Tel??fono</FormLabel>
                      <Input
                        placeholder='Tel??fono'
                        name='phoneNumber'
                        value={props.values.phoneNumber}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='phoneNumber' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>N??mero de c??dula</FormLabel>
                      <Input
                        placeholder='C??dula'
                        name='idNumber'
                        value={props.values.idNumber}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='idNumber' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Contrase??a</FormLabel>
                      <Input
                        placeholder='Contrase??a'
                        type='password'
                        name='password'
                        value={props.values.password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='password' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Repetir Contrase??a</FormLabel>
                      <Input
                        placeholder='Repetir Contrase??a'
                        type='password'
                        name='confirmPassword'
                        value={props.values.confirmPassword}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='confirmPassword' component={ErrorMessageForm} />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      disabled={!props.isValid || !props.dirty}
                      isLoading={loading}
                      type='submit'
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

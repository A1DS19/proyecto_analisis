import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { User } from '../../../app/user/types';
import { updateProfile } from '../../../app/user/userActions';
import { ErrorMessageForm } from '../../common/ErrorMessageForm';
import { updateUserValidationSchema } from '../../common/validationSchemas/authValidation';
interface ProfileUpdateFormProps {
  user: User;
}

export interface UpdateUser {
  name: string;
  lastName: string;
  phoneNumber: string;
  idNumber: string;
}

export const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
  user,
}): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialValues: UpdateUser = {
    name: user.name,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    idNumber: user.idNumber,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateUserValidationSchema}
      onSubmit={(values: UpdateUser, helpers: FormikHelpers<UpdateUser>) => {
        helpers.setSubmitting(true);
        dispatch(
          updateProfile({
            body: values,
            userId: user.id,
            callback: () => {
              helpers.setSubmitting(false);
            },
          })
        );
      }}
    >
      {(props: FormikProps<UpdateUser>) => {
        return (
          <Form>
            {/* {error && <ErrorMessageForm>{error}</ErrorMessageForm>} */}

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
              <FormLabel>Teléfono</FormLabel>
              <Input
                placeholder='Teléfono'
                name='phoneNumber'
                value={props.values.phoneNumber}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
              <ErrorMessage name='phoneNumber' component={ErrorMessageForm} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Numero de cédula</FormLabel>
              <Input
                placeholder='Cédula'
                name='idNumber'
                value={props.values.idNumber}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
              <ErrorMessage name='idNumber' component={ErrorMessageForm} />
            </FormControl>

            <Box my={3} display='flex' justifyContent='space-between'>
              <Button
                disabled={!props.isValid || !props.dirty}
                isLoading={props.isSubmitting}
                type='submit'
                colorScheme='blue'
                mr={3}
              >
                Submit
              </Button>
              <Button
                onClick={() => history.goBack()}
                disabled={props.isSubmitting}
                isLoading={false}
                colorScheme='blue'
                mr={3}
              >
                Cancelar
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Formik, FormikHelpers, FormikProps, Form, ErrorMessage } from 'formik';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useHistory } from 'react-router-dom';
import { createUser, fetchUserById, updateUser } from '../../../app/admin/adminActions';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { ErrorMessageForm } from '../../common/ErrorMessageForm';
import { FullSpinner } from '../../common/FullSpinner';
import { addUpdateValidationSchema } from '../../common/validationSchemas/authValidation';

//La contraseña no se incluye, se agrega en el server y se manda email con datos de user.

interface AddUpdateUserProps {}

export interface AddUpdateUserIntialValues {
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  idNumber: string;
  admin: boolean;
}

export const AddUpdateUser: React.FC<AddUpdateUserProps> = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const history = useHistory();
  const { user, error, loading } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    if (id) {
      setIsUpdate(true);
      dispatch(
        fetchUserById({
          id,
        })
      );
    }
  }, [id, dispatch]);

  const initialValues: AddUpdateUserIntialValues = {
    email: isUpdate ? user?.email! : '',
    name: isUpdate ? user?.name! : '',
    lastName: isUpdate ? user?.lastName! : '',
    phoneNumber: isUpdate ? user?.phoneNumber! : '',
    idNumber: isUpdate ? user?.idNumber! : '',
    admin: isUpdate ? user?.admin! : false,
  };

  if (loading) return <FullSpinner />;

  return (
    <React.Fragment>
      <Container maxW='container.sm'>
        <Button
          size='sm'
          mt={3}
          mb={5}
          leftIcon={<FaArrowLeft />}
          onClick={() => history.goBack()}
        >
          Volver
        </Button>
        <Formik
          initialValues={initialValues}
          validationSchema={addUpdateValidationSchema}
          onSubmit={async (
            values: AddUpdateUserIntialValues,
            helpers: FormikHelpers<AddUpdateUserIntialValues>
          ) => {
            helpers.setSubmitting(true);
            const newValues = { ...values, admin: JSON.parse(values.admin.toString()) };

            if (!isUpdate) {
              dispatch(
                createUser({
                  input: newValues,
                  callback: () => {
                    helpers.setSubmitting(false);
                    history.goBack();
                  },
                })
              );
            } else {
              dispatch(
                updateUser({
                  input: newValues,
                  id: user?.id!,
                  callback: () => {
                    helpers.setSubmitting(false);
                    history.goBack();
                  },
                })
              );
            }
          }}
        >
          {(props: FormikProps<AddUpdateUserIntialValues>) => {
            return (
              <Form>
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

                <FormControl mt={4}>
                  <FormLabel>Administrador</FormLabel>
                  <Select
                    name='admin'
                    value={props.values.admin.toString()}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  >
                    <option value='false'>No</option>
                    <option value='true'>Si</option>
                  </Select>
                  <ErrorMessage name='admin' component={ErrorMessageForm} />
                </FormControl>

                <Box my={4}>
                  <Button
                    type='submit'
                    disabled={!props.isValid || !props.dirty}
                    isLoading={props.isSubmitting}
                    colorScheme='blue'
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

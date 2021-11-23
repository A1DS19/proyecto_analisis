import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Textarea,
  Select,
  AlertTitle,
  AlertIcon,
  Alert,
} from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import {
  createProduct,
  fetchCategories,
  fetchProductById,
  updateProduct,
} from '../../../app/admin/adminActions';
import { Image } from '../../../app/products/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ErrorMessageForm } from '../../common/ErrorMessageForm';
import { FullSpinner } from '../../common/FullSpinner';
import { createProductValidation } from '../../common/validationSchemas/InventoryValidation';
import { AddImage } from './AddImage';
import { ListImages } from './ListImages';

interface IAddUpdateProduct {}

interface CreateProduct {
  name: string;
  description: string;
  images: [Image];
  quantity: number;
  price: number;
  category: string;
}

interface UpdateProduct {
  name?: string;
  description?: string;
  images?: [Image];
  quantity?: number;
  price?: number;
  category?: string;
}

export type IsUpdateOrCreate = UpdateProduct | CreateProduct;

export const AddUpdateProduct: React.FC<IAddUpdateProduct> = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [isUpdate, setIsUpdate] = React.useState(false);
  const history = useHistory();
  const { product, error, loading, categories } = useAppSelector((state) => state.admin);
  const [imgLoading, setImgLoading] = React.useState<null | number>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories({ callback: () => {} }));
    if (id) {
      setIsUpdate(true);
      dispatch(
        fetchProductById({
          id,
        })
      );
    }
  }, [id, dispatch]);

  if (loading) return <FullSpinner />;

  const initialValues: IsUpdateOrCreate = {
    name: isUpdate ? product?.name : '',
    category: isUpdate ? product?.category : '',
    description: isUpdate ? product?.description : '',
    images: isUpdate ? product?.images : ([] as any),
    price: isUpdate ? product?.price : 0,
    quantity: isUpdate ? product?.quantity : 0,
  };

  return (
    <React.Fragment>
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
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={createProductValidation}
        onSubmit={(
          values: IsUpdateOrCreate,
          helpers: FormikHelpers<IsUpdateOrCreate>
        ) => {
          helpers.setSubmitting(true);
          if (!isUpdate) {
            dispatch(
              createProduct({
                body: values,
                callback: () => {
                  helpers.setSubmitting(false);
                  history.goBack();
                },
              })
            );
          } else {
            dispatch(
              updateProduct({
                body: values,
                id,
                callback: () => {
                  helpers.setSubmitting(false);
                  history.goBack();
                },
              })
            );
          }
        }}
      >
        {(props: FormikProps<IsUpdateOrCreate>) => {
          return (
            <Grid templateColumns='repeat(2, 1fr)' gap={3}>
              <Box>
                <Heading size='lg'>
                  {isUpdate ? 'Actualizar producto' : 'Agregar producto'}
                </Heading>
                <Form>
                  {error && <ErrorMessageForm>{error}</ErrorMessageForm>}
                  {props.errors.images && (
                    <Alert status='info' borderRadius='lg' my={3}>
                      <AlertIcon />
                      <AlertTitle mr={2}>{props.errors.images}</AlertTitle>
                    </Alert>
                  )}
                  <Container maxW='container.sm'>
                    <FormControl my={4}>
                      <FormLabel>Nombre del producto</FormLabel>
                      <Input
                        placeholder='Nombre del producto'
                        name='name'
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='name' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl my={4}>
                      <FormLabel>Categoría del producto</FormLabel>
                      <Select
                        name='category'
                        value={props.values.category}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder='Seleccione la categoría'
                      >
                        {categories.map((item) => {
                          return (
                            <option key={item.id} value={item.name}>
                              {item.name.replaceAll('_', ' ')}
                            </option>
                          );
                        })}
                      </Select>

                      <ErrorMessage name='name' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl my={4}>
                      <FormLabel>Descripción del producto</FormLabel>
                      <Textarea
                        placeholder='Descripción del producto'
                        name='description'
                        value={props.values.description}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='description' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl my={4}>
                      <FormLabel>Precio del producto</FormLabel>
                      <Input
                        type='number'
                        placeholder='Precio del producto'
                        name='price'
                        value={props.values.price}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='price' component={ErrorMessageForm} />
                    </FormControl>

                    <FormControl my={4}>
                      <FormLabel>Cantidad del producto</FormLabel>
                      <Input
                        type='number'
                        placeholder='Cantidad del producto'
                        name='quantity'
                        value={props.values.quantity}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <ErrorMessage name='quantity' component={ErrorMessageForm} />
                    </FormControl>
                    <Button
                      type='submit'
                      mr={3}
                      disabled={!props.isValid || !props.dirty}
                      isLoading={props.isSubmitting}
                      colorScheme='blue'
                    >
                      Submit
                    </Button>
                  </Container>
                </Form>
              </Box>

              <Box>
                <Heading size='lg'>{'Imagenes'}</Heading>
                {isUpdate && <ListImages props={props} />}
                {!isUpdate && props.values.images?.length! > 4 && (
                  <Heading color='red' my={2} size='md'>
                    No puede subir mas imagenes
                  </Heading>
                )}
                {props.values.images?.length! <= 4 && (
                  <AddImage
                    setImgLoading={setImgLoading}
                    imgLoading={imgLoading}
                    props={props}
                  />
                )}
              </Box>
            </Grid>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { Product } from '../../../app/products/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { capitalizeWord } from '../../../util/functions';
import { ErrorMessageForm } from '../../common/ErrorMessageForm';
import { PromotionValidationSchema } from '../../common/validationSchemas/InventoryValidation';
import { updateProductDiscount } from '../../../app/admin/actions/promotions';
import { FullSpinner } from '../../common/FullSpinner';

interface AddUpdatePromotionProps {
  selectedPromotion: Product | undefined;
  setSelectedPromotion: React.Dispatch<React.SetStateAction<Product | undefined>>;
  inventory: Product[];
}

export interface IAddUpdatePromotion {
  id: string;
  discountedPrice: number;
  isDiscounted: boolean;
}

export const AddUpdatePromotion: React.FC<AddUpdatePromotionProps> = ({
  selectedPromotion,
  setSelectedPromotion,
  inventory,
}): JSX.Element => {
  const isUpdate = !!selectedPromotion;
  const dispatch = useAppDispatch();

  const initialValues: IAddUpdatePromotion = {
    id: !isUpdate ? '' : selectedPromotion?.id!,
    discountedPrice: !isUpdate ? 0 : selectedPromotion?.discountedPrice!,
    isDiscounted: !isUpdate ? false : selectedPromotion?.isDiscounted!,
  };

  return (
    <React.Fragment>
      <Heading size='lg'>
        {!isUpdate
          ? 'Agregar promoción'
          : `Actualizar ${capitalizeWord(selectedPromotion?.name.replaceAll('_', ' ')!)}`}
      </Heading>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={PromotionValidationSchema}
        onSubmit={(
          values: IAddUpdatePromotion,
          helpers: FormikHelpers<IAddUpdatePromotion>
        ) => {
          helpers.setSubmitting(true);
          values.isDiscounted = true;
          dispatch(
            updateProductDiscount({
              id: values.id,
              input: values,
              callback: () => {
                helpers.setSubmitting(false);
                helpers.resetForm();
              },
            })
          );
        }}
      >
        {(props: FormikProps<IAddUpdatePromotion>) => {
          return (
            <Form>
              {!isUpdate && (
                <React.Fragment>
                  <FormControl my={5}>
                    <FormLabel>Seleccione un producto</FormLabel>
                    <Select
                      name='id'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      placeholder='Seleccione un producto'
                    >
                      {inventory
                        .filter((p) => p.isDiscounted !== true)
                        .map((product) => {
                          return (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          );
                        })}
                    </Select>
                    <ErrorMessage name='id' component={ErrorMessageForm} />
                  </FormControl>
                  {props.values.id !== '' && (
                    <Box>
                      <FormLabel>Precio original</FormLabel>
                      <Input
                        disabled={true}
                        value={
                          inventory.find((product) => product.id === props.values.id)
                            ?.price
                        }
                      />
                    </Box>
                  )}
                </React.Fragment>
              )}

              <FormControl my={5}>
                <FormLabel>Precio con descuento</FormLabel>
                <Input
                  disabled={!isUpdate && props.values.id === ''}
                  type='number'
                  name='discountedPrice'
                  placeholder='Precio con descuento'
                  value={props.values.discountedPrice}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <ErrorMessage name='discountedPrice' component={ErrorMessageForm} />
              </FormControl>

              <Flex justifyContent='space-between'>
                <Button
                  type='submit'
                  leftIcon={!isUpdate ? <AddIcon /> : <EditIcon />}
                  color='orange.300'
                  variant='outline'
                  disabled={!props.isValid || !props.dirty}
                  isLoading={props.isSubmitting}
                >
                  {!isUpdate ? 'Agregar' : 'Actualizar'}
                </Button>
                <Button
                  onClick={() => {
                    setSelectedPromotion(undefined);
                    props.resetForm();
                  }}
                  color='orange.300'
                  variant='outline'
                >
                  Cancelar
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

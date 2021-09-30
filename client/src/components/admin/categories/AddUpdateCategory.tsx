import React from 'react';
import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Category } from '../../../app/products/types';
import { capitalizeWord } from '../../../util/functions';
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { ErrorMessageForm } from '../../common/ErrorMessageForm';
import { categoryValidation } from '../../common/validationSchemas/InventoryValidation';
import { useAppDispatch } from '../../../hooks/hooks';
import { createCategory, updateCategory } from '../../../app/admin/adminActions';

interface AddUpdateCategoryProps {
  selectedCategory: Category | undefined;
  setSelectedCategory: (input: Category | undefined) => void;
}

interface CategoryInput {
  name: string;
}

export const AddUpdateCategory: React.FC<AddUpdateCategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
}): JSX.Element => {
  const isUpdate = !!selectedCategory;
  const dispatch = useAppDispatch();

  const initialValues: CategoryInput = {
    name: isUpdate ? (selectedCategory?.name.replaceAll('_', ' ') as string) : '',
  };

  return (
    <React.Fragment>
      <Heading size='lg'>
        {!isUpdate
          ? 'Agregar categoria'
          : `Actualizar ${capitalizeWord(selectedCategory?.name.replaceAll('_', ' ')!)}`}
      </Heading>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={categoryValidation}
        onSubmit={(values: CategoryInput, helpers: FormikHelpers<CategoryInput>) => {
          const transformedName =
            values.name.split(' ').length < 1
              ? values.name.toLowerCase()
              : values.name.replaceAll(' ', '_y_').toLowerCase();

          helpers.setSubmitting(true);
          if (!isUpdate) {
            dispatch(
              createCategory({
                name: transformedName,
                callback: () => {
                  helpers.setSubmitting(false);
                },
              })
            );
          } else {
            dispatch(
              updateCategory({
                id: selectedCategory?.id!,
                name: transformedName,
                callback: () => {
                  helpers.setSubmitting(false);
                  setSelectedCategory(undefined);
                },
              })
            );
          }
          helpers.resetForm();
        }}
      >
        {(props: FormikProps<CategoryInput>) => {
          return (
            <Form>
              <FormControl my={5}>
                <FormLabel>Nombre de categoria</FormLabel>
                <Input
                  name='name'
                  placeholder='Nombre de categoria'
                  value={props.values.name.replaceAll('y', ' ')}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <ErrorMessage name='name' component={ErrorMessageForm} />
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
                    setSelectedCategory(undefined);
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

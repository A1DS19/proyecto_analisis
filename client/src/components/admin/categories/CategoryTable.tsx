import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Table, Thead, Tr, Th, Tbody, Box, Grid, Td } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../../../app/products/types';
import { useAppDispatch } from '../../../hooks/hooks';
import { capitalizeWord } from '../../../util/functions';
import { AlertModal } from '../../common/AlertModal';
import { AddUpdateCategory } from './AddUpdateCategory';
import { deleteCategory as deleteCategoryAction } from '../../../app/admin/adminActions';

interface CategoryTableProps {
  categories: Category[];
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState<Category | undefined>(
    undefined
  );
  const [deleteCategory, setDeleteCategory] = React.useState<Category>();
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();

  const deleteProduct = (): void => {
    dispatch(
      deleteCategoryAction({
        id: deleteCategory?.id!,
        callback: () => {},
      })
    );
  };

  const renderTRows = () => {
    return categories.map((categorie) => {
      return (
        <Tr key={categorie.id}>
          <Td>{capitalizeWord(categorie.name.replaceAll('_', ' '))}</Td>
          <Td>
            <Box display='flex' justifyContent='center' fontSize='lg'>
              <EditIcon
                mr={3}
                cursor='pointer'
                color='orange.300'
                onClick={() => {
                  setSelectedCategory(categorie);
                }}
              />
              <DeleteIcon
                color='red'
                cursor='pointer'
                onClick={() => {
                  setIsOpen(true);
                  setDeleteCategory(categorie);
                }}
              />
            </Box>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <React.Fragment>
      <Grid templateColumns='repeat(2,1fr)'>
        <Box mr={5}>
          <AddUpdateCategory
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </Box>
        <Box>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>nombre</Th>
                <Th>acciones</Th>
              </Tr>
            </Thead>
            <Tbody>{renderTRows()}</Tbody>
          </Table>
        </Box>
      </Grid>

      <AlertModal
        header='Eliminar categoria'
        message={`Esta seguro que desea eliminar ${capitalizeWord(
          deleteCategory?.name.replaceAll('_', ' ') || ''
        )}`}
        mainActionTxt='Eliminar'
        mainAction={deleteProduct}
        cancelRef={cancelRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </React.Fragment>
  );
};

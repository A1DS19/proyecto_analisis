import React from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Product } from '../../../app/products/types';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { removeProduct } from '../../../app/admin/adminActions';
import { AlertModal } from '../../common/AlertModal';

interface InventoryTableProps {
  inventory: Product[];
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  inventory,
}): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();

  const deleteProduct = (): void => {
    dispatch(removeProduct({ id: selectedProduct?.id! }));
  };

  const renderTRows = () => {
    return inventory.map((item) => {
      return (
        <Tr key={item.id}>
          <Td>{item.name}</Td>
          <Td>{item.category}</Td>
          <Td>{item.description.slice(0, 20) + '...'}</Td>
          <Td isNumeric>{item.quantity}</Td>
          <Td isNumeric>₡{item.price}</Td>
          <Td>
            <Box display='flex' justifyContent='center' fontSize='lg'>
              <EditIcon
                mr={3}
                cursor='pointer'
                color='orange.300'
                onClick={() => history.push(`/admin/inventory/${item.id}`)}
              />
              <DeleteIcon
                color='red'
                cursor='pointer'
                onClick={() => {
                  setIsOpen(true);
                  setSelectedProduct(item);
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
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>nombre</Th>
            <Th>categoria</Th>
            <Th>descripcción</Th>
            <Th isNumeric>cantidad</Th>
            <Th isNumeric>precio</Th>
            <Th>acciones</Th>
          </Tr>
        </Thead>
        <Tbody>{renderTRows()}</Tbody>
      </Table>

      <AlertModal
        header='Eliminar producto'
        message={`Esta seguro que desea eliminar ${selectedProduct?.name}`}
        mainActionTxt='Eliminar'
        mainAction={deleteProduct}
        cancelRef={cancelRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </React.Fragment>
  );
};

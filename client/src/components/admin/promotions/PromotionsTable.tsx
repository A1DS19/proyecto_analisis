import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Tr, Td, Box, Grid, Table, Tbody, Th, Thead, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../../app/products/types';
import { useAppDispatch } from '../../../hooks/hooks';
import { capitalizeWord } from '../../../util/functions';
import { AlertModal } from '../../common/AlertModal';
import { AddUpdatePromotion } from './AddUpdatePromotion';
import { deleteProductDiscount } from '../../../app/admin/actions/promotions';

interface PromotionsTableProps {
  discountedInventory: Product[];
  inventory: Product[];
}

export const PromotionsTable: React.FC<PromotionsTableProps> = ({
  inventory,
  discountedInventory,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [deletePromotion, setDeletePromotion] = React.useState<Product>();
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const [selectedPromotion, setSelectedPromotion] = React.useState<Product | undefined>(
    undefined
  );

  const deletePromotionFunction = () => {
    dispatch(deleteProductDiscount({ id: deletePromotion?.id! }));
  };

  const renderTRows = () => {
    return discountedInventory.map((product) => {
      return (
        <Tr key={product.id}>
          <Td>{capitalizeWord(product.name.replaceAll('_', ' '))}</Td>
          <Td>₡{product.price}</Td>
          <Td>₡{product.discountedPrice}</Td>
          <Td>
            <Box display='flex' justifyContent='center' fontSize='lg'>
              <EditIcon
                mr={3}
                cursor='pointer'
                color='orange.300'
                onClick={() => {
                  setSelectedPromotion(product);
                }}
              />
              <DeleteIcon
                color='red'
                cursor='pointer'
                onClick={() => {
                  setIsOpen(true);
                  setDeletePromotion(product);
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
          <AddUpdatePromotion
            inventory={inventory}
            selectedPromotion={selectedPromotion}
            setSelectedPromotion={setSelectedPromotion}
          />
        </Box>
        <Box>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>nombre</Th>
                <Th>precio original</Th>
                <Th>precio descuento</Th>
                <Th>acciones</Th>
              </Tr>
            </Thead>
            <Tbody>{renderTRows()}</Tbody>
          </Table>
        </Box>
      </Grid>

      <AlertModal
        header='Eliminar promocion'
        message={`Esta seguro que desea eliminar ${capitalizeWord(
          deletePromotion?.name.replaceAll('_', ' ') || ''
        )}`}
        mainActionTxt='Eliminar'
        mainAction={deletePromotionFunction}
        cancelRef={cancelRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </React.Fragment>
  );
};

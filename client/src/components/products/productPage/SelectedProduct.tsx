import React from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  Flex,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchProduct } from '../../../app/products/productActions';
import { FullSpinner } from '../../common/FullSpinner';
import { ImageList } from './ImageList';
import { FaCartPlus, FaArrowLeft } from 'react-icons/fa';
import { clearSelectedProduct } from '../../../app/products/productSlice';
import { addCartActionInput, addCartItem } from '../../../app/cart/cartSlice';
import { CartItem } from '../../../app/cart/types';
interface SelectedProductProps {}

export const SelectedProduct: React.FC<SelectedProductProps> = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading } = useAppSelector((state) => state.product);
  const [selectedItemQuantity, setSelectedItemQuantity] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchProduct(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  if (loading || !selectedProduct) return <FullSpinner />;

  const handleAddCartItem = () => {
    const input: addCartActionInput = {
      product: { ...selectedProduct, selectedQuantity: selectedItemQuantity } as CartItem,
    };
    dispatch(addCartItem(input));
  };

  return (
    <React.Fragment>
      <Button
        size='md'
        mt={3}
        mb={5}
        leftIcon={<FaArrowLeft />}
        onClick={() => history.goBack()}
      >
        Volver
      </Button>
      <Grid templateColumns='repeat(2, 1fr)'>
        <Box>
          <Flex>
            <Box flexDirection='column'>
              <ImageList
                setSelectedImage={setSelectedImage}
                images={selectedProduct?.images!}
              />
            </Box>
            <Box ml={4}>
              <Image
                borderRadius='2xl'
                maxWidth='500px'
                maxHeight='500px'
                src={selectedImage}
                alt='imagen producto'
              />
            </Box>
          </Flex>
        </Box>
        <Box mx={4}>
          <Heading size='lg'>{selectedProduct?.name}</Heading>
          <Stack direction='row' my={3}>
            <Text fontWeight='bold'>Precio</Text>
            <Text>₡{selectedProduct?.price}</Text>
          </Stack>
          {selectedProduct?.quantity! > 0 ? (
            <Text fontWeight='semibold' color='green.500'>
              Disponible
            </Text>
          ) : (
            <Text fontWeight='semibold' color='red.500'>
              Agotado
            </Text>
          )}
          <Stack direction='row' my={3}>
            <NumberInput
              min={0}
              defaultValue={selectedItemQuantity}
              max={selectedProduct?.quantity}
              onChange={(_, value) => setSelectedItemQuantity(value)}
              width='30%'
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              py={1}
              leftIcon={<FaCartPlus />}
              disabled={!selectedProduct?.quantity || !selectedItemQuantity}
              onClick={handleAddCartItem}
            >
              Agregar
            </Button>
          </Stack>
          <Box my={4}>
            <Text>{selectedProduct?.description}</Text>
          </Box>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

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

const TEST_IMAGES = [
  'https://c.ndtvimg.com/2020-05/9iuj3h1g_indian-food_625x300_19_May_20.jpg',
  'https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-260nw-722718097.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
];

export const SelectedProduct: React.FC<SelectedProductProps> = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading } = useAppSelector((state) => state.product);
  const [selectedImage, setSelectedImage] = React.useState(TEST_IMAGES[0]);
  const [selectedItemQuantity, setSelectedItemQuantity] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchProduct(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  if (loading) return <FullSpinner />;

  const handleAddCartItem = () => {
    const input: addCartActionInput = {
      product: { ...selectedProduct, selectedQuantity: selectedItemQuantity } as CartItem,
    };
    dispatch(addCartItem(input));
  };

  return (
    <React.Fragment>
      <Button
        size='sm'
        my={3}
        leftIcon={<FaArrowLeft />}
        onClick={() => history.goBack()}
      >
        Volver
      </Button>
      <Grid templateColumns='repeat(2, 1fr)'>
        <Box>
          <Flex>
            <Box flexDirection='column'>
              <ImageList setSelectedImage={setSelectedImage} images={TEST_IMAGES} />
            </Box>
            <Box mx={2}>
              <Image
                borderRadius='2xl'
                maxWidth='650px'
                maxHeight='650px'
                src={selectedImage as any}
                alt='imagen producto'
              />
            </Box>
          </Flex>
        </Box>
        <Box ml={2}>
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
              width='60%'
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
        </Box>
      </Grid>

      <Box my={3} maxWidth='650px'>
        <Text>{selectedProduct?.description}</Text>
      </Box>
    </React.Fragment>
  );
};

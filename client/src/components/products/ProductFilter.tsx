import { Box, Button, Center, Collapse, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { fetchCategories } from '../../util/useGetCategories';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Category } from '../../app/products/types';
import { capitalizeWord } from '../../util/functions';
import { FullSpinner } from '../common/FullSpinner';
import { useAppDispatch } from '../../hooks/hooks';
import { clearPagination } from '../../app/products/productSlice';

interface ProductFilterProps {
  setFilter: (filter: string) => void;
  filter: string;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filter,
  setFilter,
}): JSX.Element => {
  const [categories, setCategories] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      setCategories(await fetchCategories());
    })();
  }, []);

  if (!categories) {
    return <FullSpinner />;
  }

  const renderCategories = () => {
    return categories.map((category: Category) => {
      const name = capitalizeWord(category.name).replaceAll('_', ' ');
      return (
        <Button
          key={category.id}
          size='sm'
          padding={2}
          margin={2}
          onClick={() => {
            setFilter(category.name);
            dispatch(clearPagination());
          }}
          bg={filter === category.name ? 'gray.400' : 'gray.600'}
        >
          {name}
        </Button>
      );
    });
  };

  return (
    <Container maxW='container.sm' bg='gray.700' padding={3} borderRadius='lg'>
      <Center>
        <Heading size='lg'>Categorías</Heading>
      </Center>
      <Collapse startingHeight={40} in={show}>
        <Box textAlign='center'>
          <Button
            size='sm'
            padding={2}
            margin={2}
            onClick={() => {
              setFilter('');
              dispatch(clearPagination());
            }}
            bg={filter === '' ? 'gray.400' : 'gray.600'}
          >
            Todos
          </Button>
          {renderCategories()}
        </Box>
      </Collapse>
      <Center>
        <Button size='sm' onClick={handleToggle} mt='1rem'>
          {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </Button>
      </Center>
    </Container>
  );
};

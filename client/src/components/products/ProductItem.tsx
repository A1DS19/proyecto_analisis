import { Box, useColorModeValue, Stack, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../app/products/types';
import { Link, useHistory } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }): JSX.Element => {
  const history = useHistory();

  return (
    <Box
      my={4}
      role={'group'}
      p={6}
      maxW={'310px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
    >
      <Box
        onClick={() => history.push(`/product/${product.id}`)}
        cursor='pointer'
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${product.images[0]})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={product.images[0]}
        />
      </Box>
      <Stack pt={10} align={'center'}>
        {/* <Text color={'gray.400'} fontSize={'sm'} textTransform={'uppercase'}>
            {product.name}
          </Text> */}
        <Heading
          cursor='pointer'
          textAlign='center'
          fontSize={'2xl'}
          fontFamily={'body'}
          fontWeight={500}
        >
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </Heading>
        <Stack direction={'row'} align={'center'}>
          <Text fontWeight={800} fontSize={'xl'}>
            ₡{product.price}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

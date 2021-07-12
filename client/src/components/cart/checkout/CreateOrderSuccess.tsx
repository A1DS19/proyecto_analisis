import React from 'react';
import { Box, Center, Image, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface CreateOrderSuccessProps {}

export const CreateOrderSuccess: React.FC<CreateOrderSuccessProps> =
  ({}): JSX.Element => {
    return (
      <Box
        textAlign='center'
        p='40px'
        color='white'
        mt='4'
        bg='gray.700'
        rounded='lg'
        shadow='md'
      >
        <Center>
          <Image src='/success.png' alt='success' maxW='140px' maxH='140px' />
        </Center>

        <Heading>Orden creada</Heading>
        <Link to='/'>
          <Heading size='lg' _hover={{ color: '#F6AD55' }}>
            Volver
          </Heading>
        </Link>
      </Box>
    );
  };

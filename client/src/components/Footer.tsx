import React from 'react';
import { Box, Container, Stack, Text, Link, Center } from '@chakra-ui/react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (): JSX.Element => {
  return (
    <Box bg='gray.900'>
      <Container maxW='container.sm' padding={10}>
        <Center>
          <Box textAlign='center'>
            <Stack direction='row' spacing={6}>
              <Link href={'#'}>Inicio</Link>
              <Link href={'#'}>Sobre</Link>
              <Link href={'#'}>Contacto</Link>
            </Stack>
            <Text mt={2}>© {new Date().getFullYear()} DRAGON ROJO</Text>
          </Box>
        </Center>
      </Container>
    </Box>
  );
};

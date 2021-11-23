import React from 'react';
import { Box, Container, Text, Center } from '@chakra-ui/react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (): JSX.Element => {
  return (
    <Box bg='gray.900'>
      <Container maxW='container.sm' padding={10}>
        <Center>
          <Box textAlign='center'>
            <Text mt={2}>© {new Date().getFullYear()} DRAGÓN ROJO</Text>
          </Box>
        </Center>
      </Container>
    </Box>
  );
};

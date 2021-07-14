import React from 'react';
import {
  Box,
  Center,
  Image,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ScaleFade,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface CreateOrderSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOrderSuccess: React.FC<CreateOrderSuccessProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  return (
    <ScaleFade initialScale={0.1} in={isOpen}>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box
              textAlign='center'
              p='40px'
              color='white'
              mt='4'
              bg='gray.700'
              rounded='lg'
            >
              <Center>
                <Image src='/success.png' alt='success' maxW='140px' maxH='140px' />
              </Center>

              <Heading>Orden creada</Heading>
              <Link to='/'>
                <Heading size='lg' color='orange.300'>
                  Volver
                </Heading>
              </Link>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
};

import React from 'react';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { Button, Stack, useDisclosure } from '@chakra-ui/react';

interface NoAuthProps {}

export const NoAuth: React.FC<NoAuthProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = React.useState<'login' | 'register'>();

  return (
    <Stack direction='row' spacing={4} align='center'>
      <Button
        color='gray.400'
        variant='outline'
        onClick={() => {
          onOpen();
          setModal('login');
        }}
      >
        LOGIN
      </Button>
      <Button
        color='gray.400'
        variant='outline'
        onClick={() => {
          onOpen();
          setModal('register');
        }}
      >
        REGISTRO
      </Button>
      {modal === 'login' ? (
        <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      ) : (
        <Register isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      )}
    </Stack>
  );
};

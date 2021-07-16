import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { ProfileUpdateForm } from './ProfileUpdateForm';
import React from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { FullSpinner } from '../../common/FullSpinner';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

interface ProfileIndexProps {}

export const ProfileIndex: React.FC<ProfileIndexProps> = (): JSX.Element => {
  const { user, loading } = useAppSelector((state) => state.user);
  const history = useHistory();

  if (loading) {
    return <FullSpinner />;
  }

  return (
    <Container maxW='container.sm'>
      <Button
        mb={2}
        size='sm'
        leftIcon={<FaArrowLeft />}
        onClick={() => history.goBack()}
      >
        Volver
      </Button>
      <Heading>Editar mi perfil</Heading>
      <Box>
        <ProfileUpdateForm user={user!} />
      </Box>
    </Container>
  );
};

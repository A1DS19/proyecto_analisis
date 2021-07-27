import { AddIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUsers } from '../../../app/admin/adminActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { UsersTable } from './UsersTable';
import { SearchUser } from './SearchUser';

interface UsersIndexProps {}

export const UsersIndex: React.FC<UsersIndexProps> = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Box maxW='30%' my={3}>
        <SearchUser />
      </Box>
      <UsersTable users={users} />
      <Box my={4}>
        <Button
          onClick={() => history.push('/admin/user')}
          leftIcon={<AddIcon />}
          color='orange.300'
          variant='outline'
        >
          Agregar
        </Button>
      </Box>
    </React.Fragment>
  );
};

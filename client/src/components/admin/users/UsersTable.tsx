import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { Tr, Td, Box, Table, Thead, Th, Tbody } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../../app/user/types';
import { useAppDispatch } from '../../../hooks/hooks';
import { AlertModal } from '../../common/AlertModal';
import { CheckIcon } from '@chakra-ui/icons';
import { deleteUser as deleteUserAction } from '../../../app/admin/adminActions';

interface UsersTableProps {
  users: User[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();

  const deleteUser = (): void => {
    dispatch(deleteUserAction({ id: selectedUser?.id!, callback: () => {} }));
  };

  const renderTRows = () => {
    return users.map((user) => {
      return (
        <Tr key={user.id}>
          <Td>{user.name}</Td>
          <Td>{user.lastName}</Td>
          <Td>{user.email}</Td>
          <Td>{user.phoneNumber}</Td>
          <Td>{user.idNumber}</Td>
          <Td textAlign='center'>
            {user.admin ? <CheckIcon color='green.300' /> : <CloseIcon color='red' />}
          </Td>
          <Td>
            <Box display='flex' justifyContent='center' fontSize='lg'>
              <EditIcon
                mr={3}
                cursor='pointer'
                color='orange.300'
                onClick={() => history.push(`/admin/user/${user.id}`)}
              />
              <DeleteIcon
                color='red'
                cursor='pointer'
                onClick={() => {
                  setIsOpen(true);
                  setSelectedUser(user);
                }}
              />
            </Box>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <React.Fragment>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>nombre</Th>
            <Th>apellido</Th>
            <Th>email</Th>
            <Th>celular</Th>
            <Th>cédula</Th>
            <Th>admin</Th>
            <Th>acciones</Th>
          </Tr>
        </Thead>
        <Tbody>{renderTRows()}</Tbody>
      </Table>

      <AlertModal
        header='Eliminar usuario'
        message={`Esta seguro que desea eliminar a ${selectedUser?.name}`}
        mainActionTxt='Eliminar'
        mainAction={deleteUser}
        cancelRef={cancelRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </React.Fragment>
  );
};

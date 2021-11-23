import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { VscAccount } from 'react-icons/vsc';
import { BiLogOutCircle } from 'react-icons/bi';
import { FunctionComponent } from 'react';
import { User } from '../../app/user/types';
import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../app/user/userSlice';
import { Link, useHistory } from 'react-router-dom';

interface AuthMenuProps {
  user: User;
}

export const Auth: FunctionComponent<AuthMenuProps> = ({ user }): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <Flex alignItems={'center'} zIndex='modal'>
      <Menu closeOnBlur={true}>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
          <Avatar size={'sm'} src={(<VscAccount />) as any} />
        </MenuButton>
        <MenuList>
          <Link to={`/user/${user.id}`}>
            <MenuItem>Perfil</MenuItem>
          </Link>

          <Link to={`/user/${user.id}/orders`}>
            <MenuItem>Órdenes</MenuItem>
          </Link>

          {user.admin && (
            <Link to='/admin'>
              <MenuItem>Admin</MenuItem>
            </Link>
          )}
          <MenuDivider />
          <MenuItem
            fontSize='md'
            p={2}
            onClick={() => {
              dispatch(logout());
              history.push('/');
            }}
          >
            <BiLogOutCircle style={{ marginRight: '5px' }} /> SALIR
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

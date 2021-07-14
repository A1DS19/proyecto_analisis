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

interface AuthMenuProps {
  user: User;
}

export const Auth: FunctionComponent<AuthMenuProps> = ({ user }): JSX.Element => {
  //const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <Flex alignItems={'center'} zIndex='modal'>
      <Menu closeOnBlur={true}>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
          <Avatar size={'sm'} src={(<VscAccount />) as any} />
        </MenuButton>
        <MenuList>
          <MenuItem>Link 1</MenuItem>
          <MenuItem>Link 2</MenuItem>
          {/* <MenuItem onClick={toggleColorMode}>
            {colorMode === 'dark' ? 'MODO CLARO' : 'MODO OSCURO'}
          </MenuItem> */}
          <MenuDivider />
          <MenuItem fontSize='md' p={2} onClick={() => dispatch(logout())}>
            <BiLogOutCircle style={{ marginRight: '5px' }} /> SALIR
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Link,
  useColorModeValue,
  Box,
  Flex,
  IconButton,
  HStack,
  Stack,
  Image,
  Text,
  Button,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { NoAuth } from './NoAuth';
import { Auth } from './Auth';
import { useHistory } from 'react-router-dom';
import { User } from '../../app/auth/types';
import { FiShoppingCart } from 'react-icons/fi';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (): JSX.Element => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products } = useAppSelector((state) => state.cart);
  const Links: string[] = [];
  const history = useHistory();
  const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Link>
  );

  return (
    <React.Fragment>
      <Box bg='gray.900' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image
              borderRadius='full'
              boxSize='40px'
              src='/logo.png'
              alt='logo'
              onClick={() => history.push('/')}
              style={{ cursor: 'pointer' }}
            />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Stack direction='row' spacing={4}>
            <Button
              color='gray.400'
              variant='outline'
              fontSize='lg'
              leftIcon={<FiShoppingCart />}
              onClick={() => history.push('/cart')}
            >
              <Text color='orange.300'>{products.length}</Text>
            </Button>
            {isAuth ? <Auth user={user as User} /> : <NoAuth />}
          </Stack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </React.Fragment>
  );
};

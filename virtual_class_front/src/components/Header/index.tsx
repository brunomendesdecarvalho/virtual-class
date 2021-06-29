import {
  Flex,
  Text,
  Icon,
  Button as ChakraButton,
  Divider,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Button } from '../Buttons/Button';
import { ButtonOutline } from '../Buttons/ButtonOutline';
import { Logo } from './Logo';
import { Link } from '@chakra-ui/react';
import { AuthContext } from '../../contexts/AuthContext';
import { ActiveLink } from '../ActiveLink';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

export function Header() {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const { asPath } = useRouter();

  return (
    <Flex align="center" h="20" mx="20">
      <Link href="/" _hover={{ textDecoration: 'none' }}>
        <Logo />
      </Link>

      {asPath !== '/login' && (
        <Flex ml="auto">
          {!isAuthenticated ? (
            <>
              <Button text="Registrar-se" mr="5" />
              <Link href="/login">
                <ButtonOutline text="Entrar" />
              </Link>
            </>
          ) : (
            <>
              <ActiveLink
                href="/classrooms"
                mr="4"
                _hover={{ opacity: '0.8', textDecoration: 'none' }}
              >
                <Text fontSize="xl">Salas</Text>
              </ActiveLink>
              <ActiveLink
                href="/assignments"
                mr="8"
                _hover={{ opacity: '0.8', textDecoration: 'none' }}
              >
                <Text fontSize="xl">Atividades</Text>
              </ActiveLink>
              <ChakraButton
                onClick={signOut}
                bg="blue.500"
                color="white"
                h="8"
                _hover={{ opacity: '0.8', textDecoration: 'none' }}
              >
                <Text fontSize="xl">
                  <Icon as={FiLogOut} /> Sair
                </Text>
              </ChakraButton>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
}

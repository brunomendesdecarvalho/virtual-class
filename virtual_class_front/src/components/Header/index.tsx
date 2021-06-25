import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../Buttons/Button';
import { ButtonOutline } from '../Buttons/ButtonOutline';
import { Logo } from './Logo';
import { Link } from '@chakra-ui/react';

export function Header() {
  return (
    <Flex align="center" h="20" mx="20">
      <Link href="/" _hover={{ textDecoration: 'none' }}>
        <Logo />
      </Link>

      <Flex ml="auto">
        <Button text="Registrar-se" mr="5" />
        <Link href="/login">
          <ButtonOutline text="Entrar" />
        </Link>
      </Flex>
    </Flex>
  );
}

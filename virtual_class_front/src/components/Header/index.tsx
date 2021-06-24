import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../Buttons/Button';
import { ButtonOutline } from '../Buttons/ButtonOutline';
import { Logo } from './Logo';

export function Header() {
  return (
    <Flex align="center" h="20" mx="20" mb="20">
      <Logo />

      <Flex ml="auto">
        <Button text="Registrar-se" mr="5"/>
        <ButtonOutline text="Entrar" />
      </Flex>
    </Flex>
  )
}
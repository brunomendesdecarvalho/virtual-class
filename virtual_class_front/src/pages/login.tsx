import { Input, InputGroup, InputLeftElement, Stack, FormControl, Flex, Box, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../components/Buttons/Button';
import { FiMail, FiLock } from 'react-icons/fi';
import { InputWithIcon } from '../components/Form/InputWithIcon';
import Head from 'next/head';

export default function Login() {
  return (
    <Flex align="center" justify="center" h="40vh">
      <Box padding="8" border="1px" borderColor="gray.300" bg="white" borderRadius="8">
        <Text fontSize="2xl" mb="4">Login</Text>
        <FormControl maxWidth="480px">
          <Stack spacing="4">
            <InputWithIcon icon={FiMail} type="email" placeholder="E-mail"/>
            <InputWithIcon icon={FiLock} type="password" placeholder="Senha"/>
            <Button text="Entrar" type="submit" />
          </Stack>
        </FormControl>
      </Box>
      <Head>
        <title>Login | Virtual Class</title> 
      </Head>
    </Flex>
  );
}

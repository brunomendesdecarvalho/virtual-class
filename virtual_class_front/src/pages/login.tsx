import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  FormControl,
  Flex,
  Box,
  Text,
  Icon,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Button } from '../components/Buttons/Button';
import { FiUser, FiLock } from 'react-icons/fi';
import { InputWithIcon } from '../components/Form/InputWithIcon';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

type LoginInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { handleSubmit, formState, register } = useForm<LoginInputs>();
  const { isAuthenticated, signIn } = useContext(AuthContext);
  const [isInvalid, setIsInvalid] = useState(false);

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    try {
      await signIn(data);
    } catch (err) {
      setIsInvalid(true);
    }
  };

  return (
    <Flex align="center" justify="center" h="80vh">
      <Box
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
        padding="8"
        border="1px"
        borderColor="gray.300"
        bg="white"
        borderRadius="8"
      >
        <Text fontSize="2xl" mb="4">
          Login
        </Text>
        <Stack spacing="4">
          <InputWithIcon
            icon={FiUser}
            name="username"
            placeholder="Nome do usuário"
            isRequired
            isInvalid={isInvalid}
            {...register('username')}
          />
          <InputWithIcon
            icon={FiLock}
            type="password"
            name="password"
            placeholder="Senha"
            isRequired
            isInvalid={isInvalid}
            {...register('password')}
          />
          <Button text="Entrar" type="submit" />
        </Stack>
      </Box>
      <Head>
        <title>Login | Virtual Class</title>
      </Head>
    </Flex>
  );
}

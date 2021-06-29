import Head from 'next/head';
import {
  Image,
  Box,
  Flex,
  Heading,
  Text,
  Link
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ButtonXL } from '../components/Buttons/ButtonXL';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';


export default function Home() {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Flex maxWidth="1440px" mx="auto" h="80vh" align="center" justify="center">
      <Head>
        <title>Virtual Class</title>
      </Head>
      <Flex align="center" justify="space-evenly" w="full" >
        <Flex flexDirection="column" justifyContent="center" maxWidth="520px">
          <Heading
            fontSize="6xl"
            fontWeight="800"
            fontFamily="Montserrat"
            lineHeight="100px"
          >
            Tranformando as salas de aula!
          </Heading>
          <Text fontFamily="Montserrat" fontSize="2xl" color="gray.800" mt="9" mb="12">
            Conectando alunos e professores, em todas as horas, em todos os
            lugares!
          </Text>
          <Link href="/login">
            <ButtonXL text="Comece agora" />
          </Link>
        </Flex>
        <Image
          src="/images/landing_page.svg"
          alt="Virtual Class"
          width="600px"
        />
      </Flex>
    </Flex>
  );
}

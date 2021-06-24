import Head from 'next/head';
import {
  Image,
  Box,
  Flex,
  Heading,
  Text,
  Link
} from '@chakra-ui/react';
import React from 'react';
import { ButtonXL } from '../components/Buttons/ButtonXL';


export default function Home() {
  return (
    <Box maxWidth="1440px" mx="auto">
      <Head>
        <title>Virtual Class</title>
      </Head>
      <Flex align="center" justify="space-evenly" >
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
    </Box>
  );
}

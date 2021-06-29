import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Stack, Flex, useDisclosure } from '@chakra-ui/react';
import { Button } from '../components/Buttons/Button';
import { AssigmentCard } from '../components/Card/AssigmentCard';
import Head from 'next/head';
import { useAssignments } from '../hooks/useAssignments';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';
import { NewAssignmentModal } from '../components/Modals/NewAssignmentModal';

type Assignment = {
  url: string;
  sala: string;
  titulo: string;
  descricao: string;
  data_criado: string;
  data_entrega: string;
};

export default function Assignments() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { assignments, createAssignment } = useAssignments();
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }, [isAuthenticated]);
  
  if (!assignments || !user) {
    return <Text>Nenhuma atividade encontrada. :(</Text>;
  }

  return (
    <Box maxWidth="1400px" mx="36">
      <Flex my="8" justify="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Atividades
        </Text>
        { (!user.is_aluno) && <Button text="Nova Atividade" onClick={onOpen} w="42"/>}
      </Flex>

      <Stack w="full" align="center">
        {assignments.map(assignment => {
          return (
            <AssigmentCard
              key={assignment.titulo}
              sala={assignment.sala}
              titulo={assignment.titulo}
              descricao={assignment.descricao}
              data_criado={assignment.data_criado}
              data_entrega={assignment.data_entrega}
            />
          );
        })}
      </Stack>
      <Head>
        <title>Atividades | Virtual Class</title>
      </Head>
      <NewAssignmentModal isOpen={isOpen} onClose={onClose}/>
    </Box>
  );
}

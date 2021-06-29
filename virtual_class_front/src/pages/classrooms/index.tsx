import React, { useContext, useEffect, useState } from 'react';
import { Text, SimpleGrid, Box, Flex, useDisclosure } from '@chakra-ui/react';
import { api } from '../../services/apiClient';
import { ClassroomCard } from '../../components/Card/ClassroomCard';
import Head from 'next/head';
import { useClassrooms } from '../../hooks/useClassrooms';
import { NewClassroomModal } from '../../components/Modals/NewClassroomModal';
import { Button } from '../../components/Buttons/Button';
import { AuthContext } from '../../contexts/AuthContext';
import Router from 'next/router';

type Classroom = {
  url: string;
  owner: string;
  disciplina: string;
  professor: string;
  alunos: string[];
};

export default function Classrooms() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { classrooms } = useClassrooms();
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }, []);

  if (!classrooms || !user) {
    return <Text>Nenhuma sala encontrada. :(</Text>;
  }

  return (
    <Box maxWidth="1200px" mx="36">
      <Flex my="8" justify="space-between">
        <Text fontSize="3xl" fontWeight="bold">
          Salas
        </Text>
        { (!user.is_aluno) && <Button text="Criar sala" onClick={onOpen} />}
      </Flex>

      <SimpleGrid columns={4} gap="4">
        {classrooms.map((classroom, index) => {
          return (
            <ClassroomCard
              key={classroom.disciplina}
              title={classroom.disciplina}
              teacher={classroom.professor}
              students={classroom.alunos}
              number={index}
            />
          );
        })}
      </SimpleGrid>
      <Head>
        <title>Salas | Virtual Class</title>
      </Head>
      <NewClassroomModal isOpen={isOpen} onClose={onClose}/>
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import { Text, SimpleGrid, Box } from '@chakra-ui/react';
import { api } from '../services/apiClient';
import { ClassroomCard } from '../components/Card/ClassroomCard';

type Classroom = {
  url: string;
  owner: string;
  disciplina: string;
  professor: string;
  alunos: string[];
};

export default function Classrooms() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  useEffect(() => {
    api.get('salas').then(response => setClassrooms(response.data));
  }, []);

  if (!classrooms) {
    return <Text>Nenhuma sala encontrada. :(</Text>;
  }

  return (
    <Box maxWidth="1200px" mx="36">
      <Text fontSize="3xl" fontWeight="bold" my="4">Salas</Text>
      <SimpleGrid columns={4}>
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
    </Box>
  );
}

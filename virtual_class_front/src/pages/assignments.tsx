import { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { AssigmentCard } from '../components/Card/AssigmentCard';
import { api } from '../services/apiClient';

type Assignment = {
  url: string;
  sala: string;
  titulo: string;
  descricao: string;
  data_criado: string;
  data_entrega: string;
};

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>();

  useEffect(() => {
    api.get("atividades").then(response => {
      setAssignments(response.data)
    })
  }, [])

  if (!assignments) {
    return <Text>Nenhuma atividade encontrada. :(</Text>;
  }

  return (
    <Box maxWidth="1400px" mx="36">
      <Text fontSize="3xl" fontWeight="bold" my="4">
        Atividades
      </Text>
      <Flex w="full" justify="center">
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
      </Flex>
    </Box>
  );
}

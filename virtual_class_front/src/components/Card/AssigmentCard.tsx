import { Box, Text, Icon, Flex, Divider } from '@chakra-ui/react';
import { FaBook, FaCheckCircle } from 'react-icons/fa';

interface AssigmentCardProps {
  url: string;
  sala: string;
  titulo: string;
  descricao: string;
  data_criado: string;
  data_entrega?: string;
}

export function AssigmentCard({
  sala,
  titulo,
  descricao,
  data_criado,
  data_entrega,
}) {
  const isDelivered = !!data_entrega;

  return (
    <Flex
      w="720px"
      minHeight="128px"
      p="4"
      bg="white"
      shadow="md"
      borderRadius="8"
      direction="column"
      justify="space-between"
    >
      <Flex align="center" mb="4">
        <Icon as={FaBook} mr="2" color="blue.500"/>
        <Text fontWeight="600" fontSize="xl">{titulo}</Text>
        {isDelivered && <Icon ml="auto" as={FaCheckCircle} color="green.500" />}
      </Flex>
      <Flex minHeight="64px" mb="2" direction="column">
        <Text ml="4">{descricao}</Text>
      </Flex>
      <Divider />
      <Flex align="center" mt="2" justify="space-between">
        <Text>Sala: {sala}</Text>
        <Text>Data: {new Date(data_criado).toLocaleString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}</Text>
      </Flex>
    </Flex>
  );
}

import { Box, Flex, Text, Avatar, Icon } from '@chakra-ui/react';
import { FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

interface VerticalCardProps {
  title: string;
  teacher: string;
  students: string[];
  number?: number;
}

export function ClassroomCard({title, teacher, students, number=1}: VerticalCardProps) {
  const studentsCount = students.length;

  function getBgColor(): string{
    let modNumber = number % 4;
    switch (number) {
      case 0:
        return "green.500";
      case 1:
        return "gray.500";
      case 2:
        return "blue.500";
      case 4:
        return "red.500";
      default:
        return "green.500";
    }
  }

  return (
    <Flex direction="column" w="64" h="80" bg="white" textTransform="capitalize" borderRadius="4" shadow="md">
      <Flex bg={getBgColor()} h="48" borderTopRadius="4">
        <Text color="white" fontWeight="bold" fontSize="2xl" m="auto">{title}</Text>
      </Flex>
      <Flex p="4" fontSize="xl" align="center">
        <Icon as={FaChalkboardTeacher} mr="4"/>
        <Text>{teacher}</Text>
      </Flex>
      <Flex p="4">
        <Icon as={FaUsers} mr="4"/>
        <Text>{studentsCount} estudante{studentsCount !== 1 ? "s": ""}</Text>
      </Flex>
    </Flex>
  );
}
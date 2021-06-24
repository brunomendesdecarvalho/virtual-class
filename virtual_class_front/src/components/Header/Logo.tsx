import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export function Logo() {
  return (
    <>
      <Flex align="center">
        <Image src="images/online-learning.png" alt="Virtual Class" w="48px"/>
        <Text fontSize="4xl" fontFamily="Staatliches" ml="2">Virtual Class</Text>
      </Flex>
    </>
  )
}
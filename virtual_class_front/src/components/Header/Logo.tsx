import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export function Logo() {
  return (
    <>
      <Flex align="center">
        <Image src="/images/online-learning.png" alt="Virtual Class" height="48px" width="48px" />
        <Text fontSize="4xl" fontFamily="Staatliches" ml="2">Virtual Class</Text>
      </Flex>
    </>
  )
}
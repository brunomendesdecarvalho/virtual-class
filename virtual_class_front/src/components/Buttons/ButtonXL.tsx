import { Button } from '@chakra-ui/react';

interface ButtonProps {
  text: string;
}

export function ButtonXL({ text }: ButtonProps) {
  return (
    <Button
      bg="blue.500"
      w="64"
      h="14"
      fontFamily="Montserrat"
      fontWeight="800"
      color="white"
      _hover={{
        bg: 'green.500',
      }}
    >
      {text}
    </Button>
  );
}

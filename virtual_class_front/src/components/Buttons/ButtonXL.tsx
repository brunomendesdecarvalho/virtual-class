import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {
  text: string;
}

export function ButtonXL({ text, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      bg="blue.500"
      w="64"
      h="14"
      fontFamily="Montserrat"
      fontWeight="800"
      color="white"
      _hover={{
        bg: 'green.500',
      }}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
}

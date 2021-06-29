import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {
  text: string;
}

export function Button({ text, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      bg="blue.500"
      w="32"
      h="12"
      fontFamily="Montserrat"
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
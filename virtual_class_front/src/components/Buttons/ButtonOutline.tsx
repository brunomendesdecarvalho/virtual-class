import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {
  text: string;
}

export function ButtonOutline({ text, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      borderColor="blue.500"
      color="blue.500"
      w="32"
      h="12"
      fontFamily="Montserrat"
      _hover={{
        bg: 'green.500',
        borderColor: "white",
        color: "white"
      }}
      variant="outline"
    >
      {text}
    </ChakraButton>
  );
}
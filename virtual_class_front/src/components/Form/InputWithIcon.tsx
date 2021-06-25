import {
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Icon,
  InputProps,
  FormControl,
} from '@chakra-ui/react';
import { ElementType } from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface InputWithIconProps extends InputProps {
  icon: ElementType;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputWithIconProps
> = ({ icon, ...rest }, ref) => {
  return (
    <FormControl isInvalid={rest.isInvalid}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={icon} />
        </InputLeftElement>
        <Input {...rest} />
      </InputGroup>
      {rest.isInvalid && (
          <FormErrorMessage>{rest.name} is invalid</FormErrorMessage>
        )}
    </FormControl>
  );
};

export const InputWithIcon = forwardRef(InputBase);

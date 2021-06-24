import { Input, InputGroup, InputLeftElement, Icon, InputProps } from '@chakra-ui/react';
import { ElementType } from 'react';

interface InputWithIconProps extends InputProps {
  icon: ElementType;
}

export function InputWithIcon({icon, ...rest}) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={icon} />
      </InputLeftElement>
      <Input {...rest}/>
    </InputGroup>
  );
}

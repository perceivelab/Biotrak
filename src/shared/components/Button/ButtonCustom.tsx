import { Button } from 'native-base';
import React from 'react';
import { ButtonProps } from '../../../models/ButtonProps';

const ButtonCustom = ({
  title,
  color,
  size,
  onPress,
  variant,
  iconLeft,
  iconRight,
  opacity,
  disabled
}: Partial<ButtonProps>) => {
  return (
    <Button
      leftIcon={iconLeft}
      rightIcon={iconRight}
      size={size}
      borderRadius='full'
      colorScheme={color}
      onPress={onPress}
      variant={variant}
      opacity={opacity}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default ButtonCustom;

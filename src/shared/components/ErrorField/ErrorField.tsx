import { HStack, WarningIcon,Text } from "native-base";
import React from "react";
import { ErrorFieldProps } from "../../../models/ErrorFieldProps";
import { palette } from '../../palette';

export const ErrorField = ({error}: ErrorFieldProps) => {
  return (
    <HStack ml={2} mt={2} alignItems={"center"} space={2}>
      <WarningIcon style={{color: palette.error}} size={"sm"} />
      <Text 
        color={palette.error}
        fontSize={14}
        fontFamily={'Inter-Regular'}
      >{error}</Text>
    </HStack>
  );
};


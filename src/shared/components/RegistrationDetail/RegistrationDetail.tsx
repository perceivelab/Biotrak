import React, { FC } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  HStack,
  Link,
  Text,
  VStack,
  Image,
  ChevronRightIcon,
  Avatar,
} from "native-base";
import { RegistrationDetailProps } from "../../../models/RegistrationDetailProps";
import { palette } from "../../palette";
import { logoShowMore } from "../../../../assets/svg/svg";
import { SvgXml } from "react-native-svg";

const RegistrationDetail: FC<RegistrationDetailProps> = ({ onPress }) => {
  return (
    <Box
      bg="white"
      px="4"
      py="5"
      rounded="2xl"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "black",
        textAlign: "center",
      }}
    >
      <HStack>
        <Box>
          <HStack space={2}>
            <Avatar
              mr="8px"
              rounded={"2xl"}
              alignSelf={"center"}
              bg={palette.white.contrast}
              size="lg"
            >
              {<SvgXml xml={logoShowMore} width="60%" height="60%" />}
            </Avatar>
            <VStack space={1} alignItems="flex-start">
              <Text fontSize={16} style={styles.text}>
                {"Sei un produttore? \nEntra a far parte di Biotrak!"}
              </Text>
              <Link
                alignItems="center"
                onPress={onPress}
                _text={{
                  color: "primary.600",
                }}
              >
                <Text color="primary.600" fontSize={14} style={styles.textReg}>
                  Scopri di più
                </Text>
                <ChevronRightIcon
                  fontWeight={"bold"}
                  marginLeft="1"
                  size="xs"
                  color="primary.600"
                />
              </Link>
            </VStack>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-SemiBold'
  },
  textReg: {
    fontFamily: 'Inter-Regular'
  }
});

export default RegistrationDetail;

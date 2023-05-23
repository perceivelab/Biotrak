import { Box, Center, Flex, Text } from "native-base";
import React from "react";
import { SvgXml } from "react-native-svg";
import { arrowRight } from "../../../../assets/svg/svg";
import { StyleSheet, TouchableOpacity } from "react-native";
import { palette } from "../../palette";
import { InfoCardProps } from "../../../models/InfoCardProps";

export const InfoCard = ({ label, goTo }: InfoCardProps) => {
  return (
    <TouchableOpacity onPress={goTo}>
      <Box style={styles.info} rounded="2xl">
        <Flex width={"100%"} justifyContent={"space-between"} direction="row">
          <Text style={styles.label}>{label}</Text>
          <Center pl={8} size="20">
            <SvgXml xml={arrowRight} />
          </Center>
        </Flex>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  info: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    backgroundColor: palette.white.default,
  },
  label: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: palette.black.default,
  },
});

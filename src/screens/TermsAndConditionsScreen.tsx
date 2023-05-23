import { ScrollView, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";

export const TermsAndConditionsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView padding={"16px"}>
        <VStack space={4}>
          <Text fontSize={"16px"} fontFamily={"Inter-Regular"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            cum unde magni minus perspiciatis asperiores atque ipsa deserunt
            impedit a, et soluta, animi sequi dolores debitis possimus. Cum,
            debitis at?
          </Text>
          <Text fontSize={"16px"} fontFamily={"Inter-SemiBold"}>
            Title
          </Text>
          <Text fontSize={"16px"} fontFamily={"Inter-Regular"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            cum unde magni minus perspiciatis asperiores atque ipsa deserunt
            impedit a, et soluta, animi sequi dolores debitis possimus. Cum,
            debitis at?
          </Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

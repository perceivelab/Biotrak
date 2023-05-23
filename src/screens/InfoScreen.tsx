import { VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoCard } from "../shared/components/InfoCard/InfoCard";
import { navigationRef } from "../navigation/RootNavigation";

export const InfoScreen = () => {
  return (
    <SafeAreaView>
      <VStack paddingTop={8} space={3}>
          <InfoCard label={'Guida'} goTo={() => navigationRef.navigate('Guide' as never)}/>
          <InfoCard label={'About'} goTo={() => console.log('about page coming soon')}/>
          <InfoCard label={'Credits'} goTo={() => console.log('about credits coming soon')}/>
          <InfoCard label={'Termini e condizioni'} goTo={() => navigationRef.navigate('termsAndConditions' as never)}/>
      </VStack>
    </SafeAreaView>
  );
};



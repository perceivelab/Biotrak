import React, { FC, useEffect, useState } from 'react';
import useOnBoarding from '../../../hooks/useOnBoarding';
import { Box, HStack, View, VStack, Text } from 'native-base';
import CardCustom from '../GenericCard/CardCustom';
import { information, startPolygon,stopPolygon, vehiclePolygon } from '../../../../assets/svg/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environments } from '../../../environments/environments';
import { HomeProps } from '../../../models/HomeProps';
import { TextInput, StyleSheet } from 'react-native';

const HomeProducer: FC<HomeProps> = ({ nav }) => {
  
  const { localStorage } = environments;
  const { setOnBoardingOFF } = useOnBoarding();
  
  useEffect(() => {
    setOnBoardingOFF();
  }, []);

  const customNavigate = (customCase: string) => {
    nav.navigate('genericScreen', { id: customCase });
  };

  return (

    <VStack space={8} style={{ flex: 1 }}>
      <HStack space={3} justifyContent="center">
        <Box width={"48%"}>
          <CardCustom
            customFlex={"column"}
            imgSource={startPolygon}
            text={"Avvia \nProduzione"}
            goTo={() => customNavigate("productionStart")}
          />
        </Box>
        <Box width={"48%"}>
          <CardCustom
            customFlex={"column"}
            imgSource={stopPolygon}
            text={"Termina \nProduzione"}
            goTo={() => customNavigate("productionEnd")}
          />
        </Box>
      </HStack>

      <CardCustom
        customFlex={"row"}
        imgSource={vehiclePolygon}
        text={"Accettazione"}
        goTo={() => customNavigate("transporter")}
      />
      <CardCustom
        customFlex={"row"}
        imgSource={information}
        text={"Informazioni"}
        goTo={async () => nav.navigate("info")}
      />
    </VStack>
    
  );
};
export default HomeProducer;

import React, { FC, useEffect } from 'react';
import useOnBoarding from '../../../hooks/useOnBoarding';
import CardCustom from '../GenericCard/CardCustom';
import { VStack } from 'native-base';
import { information, vehiclePolygon } from '../../../../assets/svg/svg';
import { environments } from '../../../environments/environments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeProps } from '../../../models/HomeProps';

const HomeTransport: FC<HomeProps> = ({ nav }) => {
  const { localStorage } = environments;
  const { setOnBoardingOFF } = useOnBoarding();
  useEffect(() => {
    setOnBoardingOFF();
  }, []);

  const customNavigate = (customCase: string) => {
    nav.navigate('genericScreen', { id: customCase });
  };

  return (
    <VStack space={6} style={{ flex: 1 }}>
      <CardCustom
        customFlex={'row'}
        imgSource={vehiclePolygon}
        text={'Accettazione'}
        goTo={() => customNavigate('transporter')}
      />
      <CardCustom
        customFlex={'row'}
        imgSource={information}
        text={'Informazioni'}
        goTo={async () => nav.navigate('info')}
      />
    </VStack>
  );
};

export default HomeTransport;

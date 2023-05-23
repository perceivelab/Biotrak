import { Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenFC from '../models/ScreenFC';
import useAuth from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { environments } from '../environments/environments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import Loader from '../shared/components/Loader/Loader';
import QrGenerator from '../shared/components/QrGenerator/QrGenerator';
const { localStorage } = environments;

const LoadingScreen: ScreenFC<'Loading'> = ({ navigation, route }) => {
  const { setUserRedux } = useAuth();

  const checkLogged = async () => {
    if (await AsyncStorage.getItem(localStorage.onBoarding)) {
      if (await AsyncStorage.getItem(localStorage.token)) {
        const data: AxiosResponse<any> = await setUserRedux();
        data && navigation.navigate('Driver');
      } else {
        navigation.navigate('Login');
      }
    } else {
      await AsyncStorage.setItem(localStorage.onBoarding, 'true');
      navigation.navigate('Onboarding');
    }
  };

  useEffect(() => {
    
    checkLogged();
  }, []);

  return <Loader />;
};

export default LoadingScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenFC from '../models/ScreenFC';
import SwiperComponent from '../shared/components/Swiper/Swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environments } from '../environments/environments';
const { localStorage } = environments;

const OnboardingScreen: ScreenFC<'Onboarding'> = ({ navigation }) => {
  
  const onPress = async () => 
    {
      (await AsyncStorage.getItem(localStorage.onBoarding)) === 'true'
      ? navigation.navigate('Login')
      : navigation.navigate('Home');}

  return (
    <View style={styles.container}>
      <SwiperComponent onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;

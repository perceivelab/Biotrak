import AsyncStorage from '@react-native-async-storage/async-storage';
import { environments } from '../environments/environments';
const { localStorage } = environments;

const useOnBoarding = () => {
  const setOnBoardingInitial = async () => {
    (await AsyncStorage.getItem(localStorage.onBoarding))
      ? await AsyncStorage.setItem(localStorage.onBoarding, 'false')
      : await AsyncStorage.setItem(localStorage.onBoarding, 'true');
  };

  const setOnBoardingOFF = async () => await AsyncStorage.setItem(localStorage.onBoarding, 'false');
  const setOnBoardingON = async () => await AsyncStorage.setItem(localStorage.onBoarding, 'true');

  return {
    setOnBoardingInitial,
    setOnBoardingOFF,
    setOnBoardingON,
  };
};

export default useOnBoarding;

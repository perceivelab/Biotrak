import React, { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useBackHandler = (): void => {
  const backAction = () => {
    return true;
  };
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [])
  );
};

export default useBackHandler;

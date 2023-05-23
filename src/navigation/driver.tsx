import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RootStackParams from '../models/RootStackParams';
import HomeScreen from '../screens/HomeScreen';
import AnonymousScreen from '../screens/AnonymousScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { QRcodeScannerScreen } from '../screens/QRcodeScannerScreen';
import AcceptationScreen from '../screens/AcceptationScreen';
import GenericPageScreen from '../screens/GenericPageScreen';
import { InfoScreen } from '../screens/InfoScreen';
import { TermsAndConditionsScreen } from '../screens/TermsAndConditionsScreen';
import { removeSingle } from '../store/singleAcceptation/singleAcceptation.actions';
import { useDispatch } from 'react-redux';
import { ArrowBackIcon } from 'native-base';
import { palette } from '../shared/palette';
import { goBack } from './RootNavigation';

const RootStack = createStackNavigator<RootStackParams>();

export const NavigationSon: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <RootStack.Navigator initialRouteName='Home'>
      <RootStack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerStyle: { height: 100 },
          headerTitle: 'Benvenuto su Biotrak',
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
          headerTitleAlign: 'center',
          headerLeft: () => {
            return null;
          },
        }}
      />
      <RootStack.Screen
        name='Anonymous'
        component={AnonymousScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
        }}
      />
      <RootStack.Screen
        name='Guide'
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name='info'
        component={InfoScreen}
        options={{
          headerStyle: { height: 100 },
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
          title: 'Informazioni',
        }}
      />
      <RootStack.Screen
        name='Scanner'
        component={QRcodeScannerScreen}
        options={{
          headerStyle: { height: 100 },
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
        }}
      />

      <RootStack.Screen
        name='genericScreen'
        component={GenericPageScreen}
        options={{
          headerStyle: { height: 100 },
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
        }}
      />
      <RootStack.Screen
        name='pageAcceptation'
        component={AcceptationScreen}
        options={{
          headerStyle: { height: 100 },
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
          headerLeft: () => {
            return (
              <ArrowBackIcon
                marginLeft={4}
                marginRight={4}
                size={5}
                color={palette.black.default}
                onPress={() => {
                  goBack();
                  dispatch(removeSingle());
                }}
              />
            );
          },
        }}
      />
      <RootStack.Screen
        name='termsAndConditions'
        component={TermsAndConditionsScreen}
        options={{
          headerStyle: { height: 100 },
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
          title: 'Termini e Condizioni',
        }}
      />
    </RootStack.Navigator>
  );
};

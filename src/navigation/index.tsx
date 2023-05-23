import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RootStackParams from '../models/RootStackParams';
import LoginScreen from '../screens/LoginScreen';
import AnonymousScreen from '../screens/AnonymousScreen';
import { NativeBaseProvider } from 'native-base';
import { NavigationSon } from './driver';
import OnboardingScreen from '../screens/OnboardingScreen';
import { navigationRef } from './RootNavigation';
import LoadingScreen from '../screens/LoadingScreen';


const RootStack = createStackNavigator<RootStackParams>();

const NavigationCustom: React.FC = () => {
  return (
    <RootStack.Navigator initialRouteName='Loading'>
      <RootStack.Screen
        name='Loading'
        component={LoadingScreen}
        options={{
          headerShown: false
        }}
      />
      <RootStack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
          headerLeft: () => null,
        }}
      />
      <RootStack.Screen
        name='Driver'
        component={NavigationSon}
        options={{
          headerShown: false,
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
        name='Onboarding'
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default function NavigatorParent() {
  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider>
        <NavigationCustom />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

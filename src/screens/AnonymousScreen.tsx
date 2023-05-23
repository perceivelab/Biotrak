import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';
import ScreenFC from '../models/ScreenFC';
import { User } from '../models/User';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginModelProps } from '../models/LoginProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useResponse from '../hooks/useResponse';
import ButtonCustom from '../shared/components/Button/ButtonCustom';
import { environments } from '../environments/environments';
const { localStorage } = environments;

const AnonymousScreen: ScreenFC<'Anonymous'> = ({ navigation, route }) => {
  const { logout, login, getUserStorage } = useAuth();
  const { errorHandlerLogin } = useResponse();
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User>();
 
  const log = async ({ username, password }: LoginModelProps) => {
    try {
      const response = await login(username, password);
      if (response) {
        await AsyncStorage.setItem(localStorage.token, response.data);
      }
    } catch (error: any) {
      setError(errorHandlerLogin(error.status));
    }
  };
  
  const settingUser = async () => { 
    try {
      log({username: 'anonymous', password: 'Pa$$w0rd'}).then(
        async () => setUser(await getUserStorage())
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    settingUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {user ? (
          <>
            <Text>{user.username}</Text>
            <Text>{user.roles[0]}</Text>
          </>
        ) : null}
        <ButtonCustom
          color='primary'
          title='Scanner'
          size={'lg'}
          onPress={() => navigation.navigate('Scanner', { id: 'Anonymous' })}
        />
        <ButtonCustom
          color='primary'
          title='Torna alla Home'
          size={'lg'}
          onPress={async () => {
            await logout();
            navigation.navigate('Login');
          }}
        />
        <ButtonCustom
          color='primary'
          title='Scanner track 276'
          size={'lg'}
          onPress={() => navigation.navigate('SingleTrack', { id: '276' })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnonymousScreen;

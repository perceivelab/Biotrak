import { removeSingle } from './../store/singleAcceptation/singleAcceptation.actions';
import { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { User } from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environments } from '../environments/environments';
import { useDispatch } from 'react-redux';
import { addUser, clearUser } from '../store/userState/userState.actions';
import useOnBoarding from './useOnBoarding';
import { navigationRef } from '../navigation/RootNavigation';
import { clear } from '../store/inputMaterials/inputMaterials.actions';
import { clearNoBiotrack } from '../store/noBiotrack/noBiotrack.actions';

const useAuth = () => {
  const { baseUrl, localStorage } = environments;
  const dispatch = useDispatch();
  const { setOnBoardingOFF, setOnBoardingON } = useOnBoarding();
  const [now, setNow] = useState(dayjs(dayjs().format()));

  /*
    ? Interceptor's System 
  */
  axios.interceptors.request.use(
    async (config) => {
      if (!config.url?.includes('/login')) {
        dayjs.extend(isSameOrBefore);
        const dateExpired = await AsyncStorage.getItem(
          localStorage.dateExpired
        );
        const token = await AsyncStorage.getItem(localStorage.token);
        
        //token
        if (dayjs(now).isSameOrBefore(dateExpired)) {
          config.headers!.Authorization = 'Bearer ' + token;
        } else {
          logout();
        }
        config.headers!['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  /*
    ? Login API
  */
  const login = async (username: string, password: string) => {
    try {
      return await axios.post(`${baseUrl}/authority/login`, {
        username,
        password,
      });
    } catch (error: any) {
      return error;
    }
  };

  /*
    ? Save all about user in Redux
  */
  const setUserRedux = async () => {
    try {
      const { data } = await axios.get<User>(`${baseUrl}/authority/principal`);
      dispatch(addUser(data));
      return data;
    } catch (error: any) {
      if (
        error.response['_response'] ===
        'Failed to connect to biotrak.it/151.97.13.224:80'
      ) {
        return error.response['_response'];
      } else {
        logout();
        return error.response;
      }
    }
  };

  /*
    ? Save user' data on LocalStorage
  */
  const saveUsers = async () => {
    try {
      const data = await setUserRedux();
      let users: User[] = [];
      if (data) {
        if (await AsyncStorage.getItem(localStorage.users)) {
          const usersStorage = await AsyncStorage.getItem(localStorage.users);
          users = usersStorage && JSON.parse(usersStorage);
          const userRandom = users.find(
            (user) => user.username === data.username
          );
          if (userRandom) {
            await setOnBoardingOFF();
          } else {
            users.push(data);
            Promise.all([
              await AsyncStorage.setItem(
                localStorage.users,
                JSON.stringify(users)
              ),
              await setOnBoardingON(),
            ]);
          }
        } else {
          users.push(data);
          Promise.all([
            await AsyncStorage.setItem(
              localStorage.users,
              JSON.stringify(users)
            ),
            await setOnBoardingON(),
          ]);
        }
      } else {
        console.error("I couldn't get the user");
      }
    } catch (error: any) {
      console.error('error redux', error.response.status);
    }
  };

  /*
    ? To get user's data
  */
  const getUserData = async () => {
    try {
      const { data } = await axios.get<User>(`${baseUrl}/authority/principal`);
      await AsyncStorage.setItem(localStorage.user, JSON.stringify(data));
      return (await AsyncStorage.getItem(localStorage.user))
        ? await AsyncStorage.getItem(localStorage.user)
        : 'utente non trovato';
    } catch (error: any) {
      console.error('error', error.response.status);
    }
  };

  /*
    ? To get data from LocalStorage
  */
  const getUserStorage = async () => {
    try {
      await getUserData();
      const userStorage = await AsyncStorage.getItem(localStorage.user);
      return userStorage && JSON.parse(userStorage);
    } catch (error: any) {
      /*
        create an toast to handle all types of errors and not
        TIPS: will do always outputs at user, good or not!
      */
      console.error(error.response.status);
    }
  };

  /*
    ? Logout 'API'
  */
  const logout = async () => {
    Promise.all([
      await AsyncStorage.removeItem(localStorage.token),
      await AsyncStorage.removeItem(localStorage.user),
      await AsyncStorage.removeItem(localStorage.dateExpired),
    ]);
    dispatch(clearUser());
    dispatch(clear());
    dispatch(removeSingle());
    dispatch(clearNoBiotrack());
    navigationRef.navigate('Login' as never, {} as never);
  };

  /*
    ? Logout 'API'
  */
  const destructorLocalStorage = async () => {
    Promise.all([
      await AsyncStorage.removeItem(localStorage.token),
      await AsyncStorage.removeItem(localStorage.user),
      await AsyncStorage.removeItem(localStorage.onBoarding),
      await AsyncStorage.removeItem(localStorage.users),
      await AsyncStorage.removeItem(localStorage.dateExpired),
    ]);
  };

  return {
    login,
    getUserData,
    logout,
    getUserStorage,
    destructorLocalStorage,
    saveUsers,
    setUserRedux,
  };
};

export default useAuth;

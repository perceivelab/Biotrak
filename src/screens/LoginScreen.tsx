import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { PermissionsAndroid, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenFC from "../models/ScreenFC";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import ButtonCustom from "../shared/components/Button/ButtonCustom";
import useResponse from "../hooks/useResponse";
import { environments } from "../environments/environments";
import {
  Box,
  Input,
  VStack,
  Text,
  HStack,
  InfoIcon,
  Link,
  ScrollView,
} from "native-base";
import { palette } from "../shared/palette";
import CardCustom from "../shared/components/GenericCard/CardCustom";
import RegistrationDetail from "../shared/components/RegistrationDetail/RegistrationDetail";
import { qrOnly } from '../../assets/svg/svg';
import ErrorModal from "../shared/components/Modals/ErrorModal/ErrorModal";
import { LoginModelProps } from "../models/LoginProps";
import { ErrorField } from "../shared/components/ErrorField/ErrorField";
import LoadModal from "../shared/components/Modals/LoadModal/LoadModal";
import useBackHandler from "../hooks/useBackHandler";

const LoginScreen: ScreenFC<"Login"> = ({ route, navigation }) => {
  const { localStorage } = environments;
  const { login, setUserRedux, destructorLocalStorage } = useAuth();
  const { errorHandlerLogin } = useResponse();
  const [error, setError] = useState("");
  const [checkingLog, setCheckingLog] = useState(true);
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [loadModalText, setLoadModalText] = useState('Attendi...');
  const [loadModal, setLoadModal] = useState(false);

  useBackHandler();

  const checkLogged = async () => {
    (await AsyncStorage.getItem(localStorage.token))
      ? (await setUserRedux())
        ? navigation.navigate("Driver")
        : setCheckingLog(false)
      : setCheckingLog(false);
  };

  useEffect(() => {
    checkLogged();
  }, [route]);

  useEffect( () => {
    if (!errorModalShow) {
      return reset();
    }
  }, [errorModalShow])

  useEffect(()=> {
    requestPermission()
  }, [])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async ({ username, password }: LoginModelProps) => {    
    setLoadModal(true);
    let response: any;
    if (username && password) {
      try {
        response = await login(username, password);
        const sixMonth = dayjs().add(6, "months").format();
        await AsyncStorage.setItem(localStorage.token, String(response.data));
        await AsyncStorage.setItem(localStorage.dateExpired, sixMonth);
        const resUserRedux = await setUserRedux();
        if (resUserRedux === 'Failed to connect to biotrak.it/151.97.13.224:80') {
          setError(resUserRedux.split('/')[0])
          setLoadModal(false);
          setErrorModalShow(true);
        }else{
          if (
            resUserRedux &&
            resUserRedux.status &&
            resUserRedux.status !== 200 &&
            resUserRedux.status !== 201
          ) {
            setError(errorHandlerLogin(resUserRedux.status));
            setLoadModal(false);
            setErrorModalShow(true);
          } else {
            reset();
            setLoadModal(false);
            navigation.navigate('Driver');
          }
        }
      } catch (e: any) {
        setLoadModal(false);
        setError(errorHandlerLogin(response.status));
      }
    }
  };

  const setSpaceBoxLogin = (): string => {
    return errors.username || errors.password ? "5px" : "5px";
  };

  const requestPermission = async () => {
    try {
      const camera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const storage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      const phone = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
      );
      const record = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );

      if(camera === PermissionsAndroid.RESULTS.DENIED) {
        requestPermission();
      }
      
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    // show modal for
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.container}>
        {error !== '' ? (
          <ErrorModal
            showModal={errorModalShow}
            closeModal={() => setErrorModalShow(false)}
            title={'Qualcosa è andato storto'}
            text={error}
          />
        ) : null}
        <VStack space={3} style={{ flex: 1 }}>
          <Box>
            <CardCustom
              customFlex={'row'}
              imgSource={qrOnly}
              text={'Traccia Prodotto Biotrak'}
              goTo={() => navigation.navigate('Anonymous')}
            />
          </Box>
          <Text
            my={setSpaceBoxLogin()}
            textAlign={'center'}
            fontSize={16}
            color={palette.gray.default}
            style={styles.textReg}
          >
            Oppure
          </Text>
          <RegistrationDetail
            onPress={() => {
              console.log('Scopri di più');
            }}
          />
          {/* <HStack space={5} justifyContent='center'>
            <ButtonCustom
              color='primary'
              title='Delete'
              size={'sm'}
              onPress={() => {
                destructorLocalStorage();
              }}
            />
            <ButtonCustom
              color='primary'
              title='Mang'
              size={'sm'}
              onPress={() =>
                onSubmit({
                  username: 'mangimidipasquale',
                  password: 'Pa$$w0rd',
                })
              }
            />
            <ButtonCustom
              color='primary'
              title='Allevamento'
              size={'sm'}
              onPress={() =>
                onSubmit({ username: 'allevamento', password: 'Pa$$w0rd' })
              }
            />
            <ButtonCustom
              color='primary'
              title='Trasp'
              size={'sm'}
              onPress={() =>
                onSubmit({ username: 'transport', password: 'Pa$$w0rd' })
              }
            />
          </HStack> */}
          <Box
            my={setSpaceBoxLogin()}
            bg={palette.white.default}
            px='6'
            py='6'
            rounded='2xl'
            _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: palette.black.default,
              textAlign: 'center',
            }}
          >
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.text} fontSize={12}>
                    E-mail
                  </Text>
                  <Input
                    mt={2}
                    paddingX={8}
                    paddingLeft={4}
                    fontSize={16}
                    borderColor={palette.gray[400]}
                    borderRadius={'100'}
                    placeholderTextColor={palette.gray[200]}
                    placeholder='Inserisci e-email'
                    w='100%'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </>
              )}
              name='username'
            />
            {errors.username ? (
              <ErrorField error={'Campo email richiesto'} />
            ) : null}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.text} fontSize={12} marginTop={4}>
                    Password
                  </Text>
                  <Input
                    mt={2}
                    paddingX={8}
                    paddingLeft={4}
                    fontSize={16}
                    borderColor={palette.gray[400]}
                    borderRadius={'100'}
                    fontFamily={'Inter'}
                    placeholderTextColor={palette.gray[200]}
                    placeholder='Inserisci Password'
                    w='100%'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    type='password'
                  />
                </>
              )}
              name='password'
            />
            {errors.password ? (
              <ErrorField error={'Campo password richiesto'} />
            ) : null}
            <HStack
              space={2}
              marginTop={5}
              marginBottom={2}
              alignItems='center'
              justifyContent='center'
            >
              <InfoIcon color={palette.primary.default} />
              <Text
                style={styles.textReg}
                color={palette.gray[300]}
                fontSize={16}
              >
                Password dimenticata?
              </Text>
              <Link
                alignItems='center'
                onPress={() => {
                  console.log('Contattaci per ricevere la password');
                }}
                _text={{
                  color: 'primary.600',
                }}
              >
                <Text style={styles.text} color='primary.600' fontSize={16}>
                  Contattaci
                </Text>
              </Link>
            </HStack>
          </Box>
          <ButtonCustom
            color='primary'
            title='Login'
            size={'lg'}
            onPress={handleSubmit(onSubmit)}
          />
        </VStack>
        <LoadModal showModal={loadModal} text={loadModalText} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: palette.white.contrast,
  },
  loginInput: {
    borderWidth: 1,
    width: 150,
    margin: 10,
    padding: 5,
  },
  error: {
    color: palette.error,
    marginTop: 12,
    textAlign: "center",
  },
  text: {
    fontFamily: "Inter-SemiBold",
  },
  textReg: {
    fontFamily: "Inter-Regular",
  },
});

export default LoginScreen;

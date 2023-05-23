import { View, Text, StyleSheet, PermissionsAndroid, Linking, AppState } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import ScreenFC from '../models/ScreenFC';
import { useDispatch } from 'react-redux';
import useTrack from '../hooks/useTrack';
import LoadModal from '../shared/components/Modals/LoadModal/LoadModal';
import ErrorModal from '../shared/components/Modals/ErrorModal/ErrorModal';
import { addSingle, removeSingle } from '../store/singleAcceptation/singleAcceptation.actions';

export const QRcodeScannerScreen: ScreenFC<'Scanner'> = ({
  navigation,
  route,
}) => {
  const type = route.params && route.params.id!;
  const dispatch = useDispatch();
  const { checkBiotrack } = useTrack();
  const [loadBarCode, setLoadBarCode] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [permissionModalShow, setPermissionModalShow] = useState(false);

  useEffect(()=> {
    checkPersimission();
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'background') {
        navigation.navigate('Home');
      }
    };
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  },[]);
  

  const checkPersimission = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if(granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionModalShow(true);
      }
    }catch (err) {
      console.warn(err);
    }
  }

  const onBarCodeRead = (scanResult: BarCodeReadEvent) => {
    setLoadBarCode(true);
      if ((scanResult.data !== null) || (scanResult.data !== undefined)) {
        switch (type) {
          case 'Anonymous':
            setLoadBarCode(false);
            navigation.navigate('SingleTrack', { id: scanResult.data });
            break;
          case 'Acceptation':
            if (checkBiotrack(scanResult.data)) {
              dispatch(addSingle(scanResult.data));
              setLoadBarCode(false);
              navigation.navigate('genericScreen', { id: 'transporter' });
            } else {
              setErrorModalShow(true);
            }
            break;
          case 'ProductionStart':
            dispatch(addSingle(scanResult.data));
            setLoadBarCode(false);
            navigation.navigate('genericScreen', { id: 'productionStart' });
            break;
          case 'ProductionComplete':
            dispatch(addSingle(scanResult.data));
            setLoadBarCode(false);
            navigation.navigate('genericScreen', { id: 'productionEnd' });
            break;
          default:
            setLoadBarCode(false);
            navigation.navigate('SingleTrack', { id: scanResult.data });
            break;
        }
      } else {
        setLoadBarCode(false);
        setErrorModalShow(true);
      }
    return;
  };

  // const openSettings = () => {
  //   Linking.openSettings()
  //   setTimeout(()=> setPermissionModalShow(false), 1000)
  // }
  return (
    <View style={styles.container}>
      <ErrorModal 
        showModal={errorModalShow} 
        closeModal={()=>setErrorModalShow(false)} 
        title={'QR Code non valido'}
        text={'Assicurati di inquadrare un codice esistente o corretto.'}
      />

      <ErrorModal 
        showModal={permissionModalShow} 
        closeModal={()=>setPermissionModalShow(false)} 
        title={'Permessi fotocamera non concessi'}
        text={'Assicurati di dare i permessi necessari all\'applicazione.'}
      />
      <LoadModal showModal={loadBarCode} text={'Attendi per lo scan'}/>
      
      
        <RNCamera
        onBarCodeRead={onBarCodeRead}
        style={[styles.preview, {opacity: loadBarCode ? 0.3 : 1}]}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use microphone',
          message: 'We need your permission to use your microphone',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ status }) => {
          status !== 'READY' ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Waiting</Text>
            </View>
          ) : (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            ></View>
          );
        }}
        </RNCamera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

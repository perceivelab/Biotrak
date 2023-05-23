import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Rationale,
  ToastAndroid,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Box, Spinner, Icon, VStack } from 'native-base';
import { palette } from '../../palette';
import { Ionicons } from '@expo/vector-icons';
import ButtonCustom from '../Button/ButtonCustom';
import ErrorModal from '../Modals/ErrorModal/ErrorModal';
import { QrGeneratorProps } from '../../../models/QrGeneratorProps';


const QrGenerator: FC<QrGeneratorProps> = ({ backQR, takeScreenShot }) => {
  const [qrData, setQrData] = useState<string>();
  const [checkQr, setCheckQr] = useState(true);
  const [productQRref, setProductQRref] = useState<any>();
  const [permissionModalShow, setPermissionModalShow] = useState(false);

  const checkPermission = async () => {
    if (Platform.OS === 'ios') 
      //saveQrToDisk();
      return
    else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        granted === PermissionsAndroid.RESULTS.GRANTED ? takeScreenShot() : setPermissionModalShow(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // const saveQrToDisk = async () => {
  //   productQRref &&
  //     productQRref.toDataURL((data: string) => {
  //       let filePath = RNFS.PicturesDirectoryPath + `/${backQR}.png`;
  //       RNFS.writeFile(filePath, data, 'base64')
  //         .then((success) => {
  //           return CameraRoll.save(filePath, {
  //             album: `BIOTRACK`,
  //             type: 'photo',
  //           });
  //         })
  //         .then(() => {
  //           ToastAndroid.show('QRCode salvato nella galleria', ToastAndroid.LONG);
  //         })
  //         .catch((e) => {
  //           ToastAndroid.show('Non sono riuscito a salvare il QR CODE', ToastAndroid.LONG);
  //         });
  //     });
  // };

  useEffect(() => {
    setTimeout(() => {
      backQR !== '' && setQrData(backQR)
      setCheckQr(false);
  }, 1500);
  }, [backQR]);

  return (
    <>
      <ErrorModal 
        showModal={permissionModalShow} 
        closeModal={()=>setPermissionModalShow(false)} 
        title={'Permessi storage non concessi'}
        text={'Assicurati di dare i permessi necessari all\'applicazione.'}
      />
      
        {backQR !== '' ? (
          <View style={styles.container}>
            <VStack space={5} alignItems='center'>
              <Box size={150}>
                {qrData ? (
                  <QRCode
                    value={qrData}
                    size={150}
                    color={palette.black.default}
                    backgroundColor={palette.white.default}
                    quietZone={14}
                    logo={require('../../../../assets/img/logo.png')}
                    logoSize={30}
                    logoBackgroundColor='white'
                    getRef={(c) => c && setProductQRref(c)}
                  />
                ) : (
                  <Spinner
                    padding={5}
                    size='lg'
                    color={palette.primary.default}
                    accessibilityLabel='Loading posts'
                  />
                )}
              </Box>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <ButtonCustom
                    size={'lg'}
                    color='primary'
                    iconLeft={
                      <Icon as={Ionicons} name='ios-download-outline' size='md' />
                    }
                    variant='outline'
                    title='Scarica'
                    onPress={() => checkPermission()}
                    disabled={checkQr}
                  />
                </View>
                <View style={styles.button}>
                  <ButtonCustom
                    size={'lg'}
                    color='primary'
                    iconLeft={
                      <Icon as={Ionicons} name='ios-print-outline' size='md' />
                    }
                    variant='outline'
                    title='Stampa'
                  />
              </View>
              </View>
            </VStack>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>QR CODE GENERATED HERE</Text>
          </View>
        )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  button: {
    width: '45%',
  },
});

export default QrGenerator;

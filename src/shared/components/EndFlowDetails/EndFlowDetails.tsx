import { View, StyleSheet, ToastAndroid, AppState } from "react-native";
import React, { useEffect, useRef } from "react";
import { Box, VStack, Text } from 'native-base';
import { palette } from "../../palette";
import { SvgXml } from "react-native-svg";
import { success, wait } from '../../../../assets/svg/svg';
import ButtonCustom from "../Button/ButtonCustom";
import StampTypeOfTrack from "../StampTypeOfTrack/StampTypeOfTrack";
import { EndFlowDetailsProps } from "../../../models/EndFlowDetailsProps";
import QrGenerator from "../QrGenerator/QrGenerator";
import dayjs from "dayjs";
import { navigationRef } from '../../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { removeSingle } from '../../../store/singleAcceptation/singleAcceptation.actions';
import { selectProductionType } from "../../../store/stateProduction/inputStateProduction.selector";
import CameraRoll from '@react-native-community/cameraroll';
import ViewShot from "react-native-view-shot";

const EndFlowDetails = ({textType, track, startProduction, qr, error, buttonText, navigation}:EndFlowDetailsProps) => {

  const productionType = useSelector(selectProductionType);
  const dispatch = useDispatch();
  const ref = useRef<any>();

  useEffect(()=> {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'background') {
        console.log('App is in background');
        navigation && navigation.navigate('Home');
      }
    };
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  },[]);

  const takeScreenShot = () => {
    try {
      setTimeout(()=> {
        ref.current.capture().then((uri:any) => {
          CameraRoll.save(uri,{type:"photo",album:"BIOTRACK"});
          ToastAndroid.show('QRCode salvato nella galleria', ToastAndroid.LONG);
        });
      },200)
      
    }catch {
      ToastAndroid.show('Non sono riuscito a salvare il QR CODE', ToastAndroid.LONG);
    }
      
  };
  
  return (
    
      <VStack space={3}>
        <ViewShot ref={ref} options={{fileName: 'file-name', format: 'png'}}>
          <VStack space={3}>
            {startProduction ? (
              <Box background={palette.white.default} padding={5} borderRadius={24}>
                <VStack space={3}>
                  <Text fontSize={'xl'} style={styles.titleProduction}>
                    {track?.name}
                  </Text>
                  {qr ? <QrGenerator backQR={qr} takeScreenShot={takeScreenShot} /> : null}
                </VStack>
              </Box>
            ) : null}
            <Box background={palette.white.default} padding={5} borderRadius={24}>
              <VStack space={3}>
                {!startProduction ? (
                  <>
                    <Box background={palette.gray[50]} padding={3} borderRadius={24}>
                      <VStack space={5} padding={1} alignItems={'center'}>
                        <Text fontSize={'md'} style={styles.span}>
                          {textType}
                        </Text>
                        {<SvgXml xml={error ? wait : success} />}
                      </VStack>
                    </Box>

                    <Text fontSize={'2xl'} style={styles.title}>
                      {track?.name}
                    </Text>
                  </>
                ) : null}
                <VStack space={3}>
                  {productionType === 'productionStart' && <View style={[styles.idContainer]}>
                    <Text fontSize={'md'} style={styles.text}>
                      ID{' '}
                      <Text style={styles.span}>
                        {track ? 'BT-' + String(track.id) : ''}
                      </Text>
                    </Text>
                    <StampTypeOfTrack biotrack={true} />
                  </View>}
                  <Text fontSize={'md'} style={styles.text}>
                    Data di creazione{' '}
                    <Text style={styles.span}>
                      {track ? dayjs(track.issuedAt).format('DD-MM-YYYY') : ''}
                    </Text>
                  </Text>
                  <Text fontSize={'md'} style={styles.text}>
                    Data di scadenza{' '}
                    <Text style={styles.span}>
                      {track ? dayjs(track.expiration).format('DD-MM-YYYY') : ''}
                    </Text>
                  </Text>
                  <Text fontSize={'md'} style={styles.text}>
                    Tipo{' '}
                    <Text style={styles.span}>{track ? String(track.type) : ''}</Text>
                  </Text>
                  <Text fontSize={'md'} style={styles.text}>
                    Lotto{' '}
                    <Text style={styles.span}>
                      {track ? String(track.batchCode) : ''}
                    </Text>
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </VStack>
        </ViewShot>
        <VStack space={3}>
          <ButtonCustom
            title={buttonText}
            color='primary'
            size={'lg'}
            onPress={() => {
              dispatch(removeSingle());
              navigationRef.navigate(
                'genericScreen' as never,
                { id: productionType } as never
              );
            }}
          />
          {!startProduction ? (
            <ButtonCustom
              title='Torna alla Home'
              color='primary'
              size={'lg'}
              variant='outline'
              onPress={() => {
                dispatch(removeSingle());
                navigationRef.navigate('Home' as never, {} as never);
              }}
            />
          ) : null}
        </VStack>
      </VStack>
    
  );
};

const styles = StyleSheet.create({
  idContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter-Regular",
  },
  title: {
    fontFamily: "Inter-SemiBold",
    marginBottom: 16,
    textAlign: "center",
  },
  titleProduction: {
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
  span: {
    fontFamily: "Inter-SemiBold",
  }
});

export default EndFlowDetails;

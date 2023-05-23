import React, { useState, useEffect } from 'react';
import ScreenFC from '../models/ScreenFC';
import { AppState, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FabButton from '../shared/components/FabButton/FabButton';
import useSelectionType from '../hooks/useSelectionType';
import { palette } from '../shared/palette';
import { SvgXml } from 'react-native-svg';
import { image } from '../helpers/returnImageGenericPage';
import { ActionType } from '../helpers/ActionType';
import { useDispatch, useSelector } from 'react-redux';
import { selectSingleAcceptation } from '../store/singleAcceptation/singleAcceptation.selectors';
import DetailModal from '../shared/components/Modals/DetailModal/DetailModal';
import { removeSingle } from '../store/singleAcceptation/singleAcceptation.actions';
import useTrack from '../hooks/useTrack';
import ErrorModal from '../shared/components/Modals/ErrorModal/ErrorModal';
import LoadModal from '../shared/components/Modals/LoadModal/LoadModal';
import { TrackRedux } from '../models/TrackModel';
import dayjs from 'dayjs';
import NoBiotrackModal from '../shared/components/Modals/NoBiotrackModal/NoBiotrackModal';
import { clearNoBiotrack } from '../store/noBiotrack/noBiotrack.actions';
import { selectNoBiotrack } from '../store/noBiotrack/noBiotrack.selectors';
import { NoBiotrackModelRedux } from '../models/NoBiotrackModel';
import {
  add,
  clear,
  remove,
} from '../store/inputMaterials/inputMaterials.actions';
import { selectInputMaterials } from '../store/inputMaterials/inputMaterials.selectors';
import {
  Text,
  Box,
  HStack,
  ScrollView,
  VStack,
  Button as Btn,
  DeleteIcon,
  CheckIcon,
} from 'native-base';
import StampTypeOfTrack from '../shared/components/StampTypeOfTrack/StampTypeOfTrack';
import ButtonCustom from '../shared/components/Button/ButtonCustom';
import InsertProductionModal from '../shared/components/Modals/InsertProductionModal/InsertProductionModal';
import ExpireSliderModal from '../shared/components/Modals/ExpireSliderModal/ExpireSliderModal';
import { selectUserState } from '../store/userState/userState.selectors';
import { addType } from '../store/stateProduction/inputStateProduction.actions';
import { setEventType } from '../helpers/setEventType';

const GenericPageScreen: ScreenFC<'genericScreen'> = ({
  navigation,
  route,
}) => {
  const singleAcceptation = useSelector(selectSingleAcceptation);
  const NoBiotrack = useSelector(selectNoBiotrack);
  const materials = useSelector(selectInputMaterials);
  const user = useSelector(selectUserState);

  const dispatch = useDispatch();
  const { getHistoryTrack, createTrack, concatTrack, getSingleTrack } = useTrack();

  const { selection, text, title } = useSelectionType();
  const [opacity, setOpacity] = useState(false);

  const [detailModal, setDetailModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState(
    'Assicurati di inquadrare un codice esistente o corretto.'
  );
  const [loadModal, setLoadModal] = useState(false);
  const [loadModalText, setLoadModalText] = useState('Attendi per lo scan');
  const [noBiotrackModal, setNoBiotrackModal] = useState(false);
  const [nameProductionModal, setNameProductionModal] = useState(false);
  const [expiredModal, setExpiredModal] = useState(false);

  const [track, setTrack] = useState<TrackRedux>();
  const [noBiotrackState, setNoBioTrackState] =
    useState<NoBiotrackModelRedux>();
  const [nameProduction, setNameProduction] = useState('');
  //
  const [lot, setLot] = useState('')
  //
  const [expired, setExpired] = useState('');

  const type =
    route.params && route.params.id!
      ? (route.params.id! as keyof typeof ActionType)
      : 'default';

  const childToParentName = (childData: string) => {
    setNameProduction(childData);
  };

  const childToParentLot = (childLot: string) => {
    setLot(childLot);
  }

  const childToParentExpired = (childData: string) => {
    setExpired(childData);
  };

  useEffect(()=>{
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
  }, [])

  useEffect(() => {
    type && selection(type);
    navigation.setOptions({ title: title });
    singleTrackAcceptation();
    dispatch(addType(type));
  }, [title, singleAcceptation, route, materials]);

  useEffect(() => {
    track ? setDetailModal(true) : setDetailModal(false);
  }, [track]);

  useEffect(() => {
    NoBiotrack.id !== ''
      ? setNoBioTrackState({ ...NoBiotrack, biotrack: false })
      : null;
    noBiotrackState ? setDetailModal(true) : setDetailModal(false);
  }, [NoBiotrack]);

  useEffect(() => {
    nameProduction !== '' ? setExpiredModal(true) : setNameProductionModal(false);
  }, [nameProduction]);

  useEffect(() => {
    expired !== '' ? startProduction() : setExpiredModal(false);
  }, [expired]);

  const startProduction = async () => {
    setLoadModalText("Attendi l'avvio della produzione...");
    setLoadModal(true);
    if (user) {
      try {
        const dataExpired = expired.split('-').reverse().join('-');
        const date = new Date(dataExpired);
        const timestampInSeconds = Math.floor(date.getTime());
        const expiredStart = new Date(timestampInSeconds).toISOString();

        const reduceMaterial = materials.reduce((acc: Array<number | string>, item, _) => {
              acc.push(
                item.biotrack
                  ? Number(item.id)
                  : String(item.id)
              );
            return acc;
          }, [])          

        const response = await createTrack(
          'PRODUCTION_START',
          user.roles[0],
          nameProduction,
          reduceMaterial,
          expiredStart,
          lot || undefined
        );
        
        if (response) {
          setExpired('');
          setNameProduction('');
          setLoadModal(false);
          const id = response.data.id;          
          id &&
            navigation.navigate('pageAcceptation', { id: `BT-${String(id)}` });
          dispatch(clear());
        }
      } catch (error) {
        console.error('Sono andato in errore', error);
        if(error === "[TypeError: undefined is not an object (evaluating 'response.data.id')]")
        setErrorModalText(
          'Il server risponde Request failed with status code 500'
        );
        setExpiredModal(false);
        setLoadModal(false);
        setErrorModal(true);
      }
    }
  };

  const acceptationMaterial = async () => {
    setLoadModalText("Attendi l'accettazione");
    setLoadModal(true);
    const event = setEventType(type);
    try {
      const response = await concatTrack(singleAcceptation, event);
      
      if (response) {
        setLoadModal(false);
        const id = response.data.id as string;
        
        return id && `BT-${id}`;
      }
    } catch (error) {
      setLoadModal(false);
      setErrorModal(true);
    }
  };

  const singleTrackAcceptation = async () => {
    setErrorModal(false);
    if (singleAcceptation === '') {
      setDetailModal(false);
      setNoBiotrackModal(false);
    } else {
      try {
        setLoadModal(true);
        if (singleAcceptation.split('BT-').length > 1) {
          const { data } = await getSingleTrack(singleAcceptation);
          setTrack({ ...data, biotrack: true });
          setLoadModal(false);
        } else {
          setLoadModal(false);
          setNoBiotrackModal(true);
        }
      } catch (error: any) {
        console.error('error singleTrackAcceptation', error);
        setLoadModal(false);
        setErrorModal(true);
      }
    }
  };

  const closeModalDetail = () => {
    dispatch(removeSingle());
    dispatch(clearNoBiotrack());
    setDetailModal(false);
    setTrack(undefined);
    setNoBioTrackState(undefined);
  };

  const closeModalNoBio = () => {
    dispatch(clearNoBiotrack());
    setNoBiotrackModal(false);
  };

  const closeModalNameProduction = () => {
    setNameProductionModal(false);
  };

  const closeModalExpired = () => {
    setExpiredModal(false);
  };

  return (
    <>
      {type === 'productionStart' && materials.length !== 0 ? (
        <>
          <SafeAreaView
            style={[styles.containerMaterial, opacity && { opacity: 0.12 }]}
          >
            <ScrollView>
              <VStack space={4}>
                {materials && materials.length !== 0
                  ? materials.map((item, index) => {
                      return (
                        <Box key={index} bg='white' px='3' py='3' rounded='2xl'>
                          <HStack
                            justifyContent={'space-around'}
                            alignItems={'center'}
                          >
                            <Box>
                              <VStack space={3}>
                                <Text style={styles.title}>{item.name}</Text>
                                <HStack space={4}>
                                  {/* <Text fontSize={'sm'} style={styles.textBox}>
                                    ID{' '}
                                    <Text style={styles.span}>
                                      {item.biotrack
                                        ? `BT-${item.id}`
                                        : item.id}
                                    </Text>
                                  </Text> */}
                                  <StampTypeOfTrack biotrack={item.biotrack} />
                                </HStack>
                              </VStack>
                            </Box>
                            <Box>
                              <Btn
                                bgColor={palette.white.default}
                                onPress={() => dispatch(remove(index))}
                              >
                                <DeleteIcon
                                  ml={1}
                                  size='lg'
                                  color={palette.gray.default}
                                />
                              </Btn>
                            </Box>
                          </HStack>
                        </Box>
                      );
                    })
                  : null}
              </VStack>
              <VStack space={3} marginTop={5}>
                <ButtonCustom
                  iconLeft={<CheckIcon />}
                  color='primary'
                  title='Inizia la produzione'
                  size={'lg'}
                  onPress={() => {
                    setNameProductionModal(true);
                  }}
                />
                <ButtonCustom
                  color='error'
                  variant='ghost'
                  title='Cancella tutto'
                  size={'lg'}
                  iconLeft={<DeleteIcon />}
                  onPress={() => {
                    dispatch(clear());
                  }}
                />
              </VStack>
            </ScrollView>
          </SafeAreaView>
        </>
      ) : (
        <>
          <SafeAreaView
            style={[styles.container, opacity && { opacity: 0.12 }]}
          >
            <View style={styles.circle}>
              {<SvgXml xml={image(type)} width='100%' height='100%' />}
            </View>
            <View style={styles.body}>
              <Text style={styles.text}>{text}</Text>
            </View>
          </SafeAreaView>
        </>
      )}

      {track || noBiotrackState ? (
        <DetailModal
          title={
            track
              ? String(track.name)
              : noBiotrackState
              ? noBiotrackState.name
              : ''
          }
          showModal={detailModal}
          closeModal={() => {
            setTrack(undefined);
            setNoBioTrackState(undefined);
            closeModalDetail();
          }}
          navigate={async () => {
            if (type === 'productionStart') {
              track
                ? dispatch(add(track))
                : noBiotrackState
                ? dispatch(add(noBiotrackState))
                : null;
              setTrack(undefined);
              setNoBioTrackState(undefined);
              dispatch(removeSingle());
              dispatch(clearNoBiotrack());
            } else {
              const idAcceptation = await acceptationMaterial();
              setDetailModal(false);
              idAcceptation &&
                navigation.navigate('pageAcceptation', {
                  id: idAcceptation || '',
                });
            }
          }}
          id={
            track
              ? 'BT-' + String(track.id)
              : noBiotrackState
              ? noBiotrackState.id
              : ''
          }
          expirationeDate={
            track
              ? dayjs(track.expiration).format('DD-MM-YYYY')
              : noBiotrackState
              ? noBiotrackState.expirationDate
              : ''
          }
          createDate={
            track
              ? dayjs(track.issuedAt).format('DD-MM-YYYY')
              : noBiotrackState
              ? noBiotrackState.creationDate
              : ''
          }
          type={track ? String(track.type) : noBiotrackState ? 'Generic' : ''}
          lot={
            track
              ? String(track.batchCode)
              : noBiotrackState
              ? noBiotrackState.lot
              : ''
          }
        />
      ) : null}
      <NoBiotrackModal
        showModal={noBiotrackModal}
        closeModal={closeModalNoBio}
      />
      <ErrorModal
        showModal={errorModal}
        closeModal={() => {
          dispatch(removeSingle());
          setErrorModal(false);
        }}
        title={'QR Code non valido'}
        text={errorModalText}
      />
      <LoadModal showModal={loadModal} text={loadModalText} />
      <InsertProductionModal
        childToParent={childToParentName}
        childToParentLot = {childToParentLot}
        showModal={nameProductionModal}
        closeModal={closeModalNameProduction}
      />
      <ExpireSliderModal
        childToParent={childToParentExpired}
        showModal={expiredModal}
        closeModal={closeModalExpired}
      />
      <FabButton
        type={type}
        navigate={navigation}
        opacity={() => (opacity ? setOpacity(false) : setOpacity(true))}
      />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 16,
  },
  containerMaterial: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: palette.white.contrast,
    marginTop: 15,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: palette.white.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: palette.gray[200],
    fontFamily: 'Inter-Regular',
  },
  textBox: {
    fontFamily: 'Inter-Regular',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  span: {
    fontFamily: 'Inter-SemiBold',
  },
});

export default GenericPageScreen;

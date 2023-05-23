import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenFC from '../models/ScreenFC';
import { Track } from '../models/TrackModel';
import useTrack from '../hooks/useTrack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectProductionType } from '../store/stateProduction/inputStateProduction.selector';
import Loader from '../shared/components/Loader/Loader';
import ErrorModal from '../shared/components/Modals/ErrorModal/ErrorModal';
import { navigationRef } from '../navigation/RootNavigation';
import EndFlowDetails from '../shared/components/EndFlowDetails/EndFlowDetails';
import { useSelector } from 'react-redux';
import { setTextButton } from '../helpers/setTextButton';
import { setTitleDetails } from '../helpers/setTitleDetails';
import useBackHandler from '../hooks/useBackHandler';

const AcceptationScreen: ScreenFC<'pageAcceptation'> = ({
  navigation,
  route,
}) => {
  const productionType = useSelector(selectProductionType);
  const idTrack =
    route.params && route.params.id! ? route.params.id! : 'default';
  const { getHistoryTrack } = useTrack();
  const [qrData, setQrData] = useState('');
  const [track, setTrack] = useState<Track>();
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorModalText, setErrorModalText] = useState(
    'Qualcosa è andato storto'
  );
  const setEventTrack = async () => {
    if (idTrack) {
      try {
        const response = await getHistoryTrack(idTrack);
        productionType === 'productionStart' &&
          response &&
          setQrData('BT-' + String(response.data.id));
        response && setTrack(response.data);
      } catch (error) {
        setErrorModalText('Abbiamo riscontrato un problema con il server');
        setErrorModalShow(true);
      }
    } else {
      setErrorModalText('Codice id della traccia non trovato');
      setErrorModalShow(true);
    }
  };

  useBackHandler();
  useEffect(() => {
    navigation.setOptions({ title: setTitleDetails(productionType) });
    setEventTrack();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!track ? (
          <Loader />
        ) : (
          <EndFlowDetails
            textType={
              productionType === 'transporter'
                ? 'Materia accettata'
                : 'Produzione Terminata'
            }
            track={track}
            startProduction={productionType === 'productionStart'}
            qr={qrData}
            buttonText={setTextButton(productionType)}
            error={false}
          />
        )}
        <ErrorModal
          showModal={errorModalShow}
          closeModal={() => {
            setErrorModalShow(false),
              navigationRef.navigate(
                'genericScreen' as never,
                { id: productionType } as never
              );
          }}
          title={errorModalText}
          text={'Errore non previsto'}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
});

export default AcceptationScreen;

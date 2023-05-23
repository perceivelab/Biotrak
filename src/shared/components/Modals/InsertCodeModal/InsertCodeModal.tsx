import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Modal,
  Center,
  Text,
  Input,
  VStack,
  DeleteIcon,
  Button,
  HStack,
} from 'native-base';
import { InsertCodeModalProps } from '../../../../models/InsertCodeModalProps';
import ButtonCustom from '../../Button/ButtonCustom';
import { palette } from '../../../palette';
import useResponse from '../../../../hooks/useResponse';
import {
  addSingle,
  removeSingle,
} from '../../../../store/singleAcceptation/singleAcceptation.actions';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../ErrorModal/ErrorModal';
import { selectSingleAcceptation } from '../../../../store/singleAcceptation/singleAcceptation.selectors';

const InsertCodeModal = ({
  showModal,
  closeModal,
  textButton,
}: InsertCodeModalProps) => {
  const [Zindex, setZindex] = useState(true);
  const [barcodeCodes, setBarcodes] = useState<string>();
  const [errorModal, setErrorModal] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { errorHandlerLogin } = useResponse();

  const singleAcceptation = useSelector(selectSingleAcceptation);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      code: '',
    },
  });

  useEffect(() => {
    barcodeCodes && dispatch(addSingle(barcodeCodes));
    reset({ code: '' });
  }, [barcodeCodes]);

  useEffect(()=> {
    reset({ code: '' });
  }, [singleAcceptation])

  const onSubmit = ({ code }: { code: string | undefined }) => {
    if (code === '') {
      setError(errorHandlerLogin(0, 'Inserisci un codice Valido'));
    } else {
      const codesplit = Zindex
        ? barcodeCodes && barcodeCodes.split('BT-')[1]
        : barcodeCodes;
      code === codesplit && dispatch(removeSingle());
      setError('');
      code === ''
        ? setErrorModal(true)
        : setBarcodes(Zindex ? 'BT-' + code : code);
      barcodeCodes && dispatch(addSingle(barcodeCodes));
      closeModal();
    }
  };

  return (
    <View>
      <ErrorModal
        showModal={errorModal}
        closeModal={() => setErrorModal(false)}
        title={'Codice non valido o non riconosciuto'}
        text={'Assicurati di inserire un codice esistente o corretto.'}
      />
      <Center>
        <Modal isOpen={showModal} size={'xl'}>
          <Modal.Content borderRadius={20} padding={1}>
            <View style={styles.modalBody}>
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <Text style={styles.title}>
                  Inserisci manualmente il Codice ID
                </Text>
              </View>
              <VStack space={3} padding={2}>
                {textButton === 'Aggiungi alla produzione' && (
                  <HStack justifyContent={'center'}>
                    <Button
                      variant={Zindex ? null : 'outline'}
                      rounded={15}
                      paddingTop={3}
                      paddingBottom={3}
                      w={'54%'}
                      style={[styles.switch1, { zIndex: Zindex ? 1 : 0 }]}
                      onPress={() => !Zindex && setZindex(true)}
                    >
                      <Text
                        style={[
                          styles.textButton,
                          {
                            color: Zindex
                              ? palette.white.default
                              : palette.primary.default,
                          },
                        ]}
                      >
                        QR CODE
                      </Text>
                    </Button>
                    <Button
                      rounded={15}
                      variant={Zindex ? 'outline' : null}
                      paddingTop={3}
                      paddingBottom={3}
                      w={'54%'}
                      style={[styles.switch2, { zIndex: Zindex ? 0 : 1 }]}
                      onPress={() => Zindex && setZindex(false)}
                    >
                      <Text
                        style={[
                          styles.textButton,
                          {
                            color: Zindex
                              ? palette.primary.default
                              : palette.white.default,
                          },
                        ]}
                      >
                        BARCODE
                      </Text>
                    </Button>
                  </HStack>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={styles.label}>Codice ID</Text>
                      <Input
                        style={styles.input}
                        borderRadius={'100'}
                        placeholderTextColor={palette.gray[200]}
                        placeholder='90909090'
                        paddingLeft={Zindex ? 1 : 5}
                        leftElement={
                          Zindex ? (
                            <Text style={styles.text} paddingLeft={4}>
                              BT -
                            </Text>
                          ) : (
                            <Text></Text>
                          )
                        }
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name='code'
                />
                {error !== '' ? (
                  <Text style={styles.error}>{error}</Text>
                ) : null}
                <ButtonCustom
                  color='primary'
                  title={textButton}
                  size={'lg'}
                  onPress={handleSubmit(onSubmit)}
                />
                <ButtonCustom
                  variant='ghost'
                  title='Annulla'
                  color='error'
                  size={'lg'}
                  iconLeft={<DeleteIcon />}
                  onPress={() => {
                    closeModal();
                    setError('');
                    reset({ code: '' });
                  }}
                />
              </VStack>
            </View>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingTop: 16,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  label: {
    paddingHorizontal: 8,
    paddingLeft: 2,
    marginTop: 4,
    fontSize: 12,
    color: palette.gray[300],
    fontFamily: 'Inter-SemiBold',
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white.default,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: palette.black.default,
  },
  switch1: {
    position: 'relative',
    left: 8,
  },
  switch2: {
    position: 'relative',
    right: 8,
  },
  textButton: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  error: {
    color: palette.error,
    marginTop: 5,
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    borderColor: palette.gray[400],
    fontFamily: 'Inter-Regular',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: palette.gray[500],
  },
  modalBody: {
    padding: 16
  }
});

export default InsertCodeModal;

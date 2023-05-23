import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Modal, Center, Input, Text, DeleteIcon, Box, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { palette } from '../../../palette';
import ButtonCustom from '../../Button/ButtonCustom';
import { NoBiotrackModalProps } from '../../../../models/NoBiotrackModalProps';
import { NoBiotrackModalInputProps } from '../../../../models/NoBiotrackModalInput';
import { ErrorField } from '../../ErrorField/ErrorField';
import { useDispatch, useSelector } from 'react-redux';
import { selectSingleAcceptation } from '../../../../store/singleAcceptation/singleAcceptation.selectors';
import { addNoBiotrack, clearNoBiotrack } from '../../../../store/noBiotrack/noBiotrack.actions';

const NoBiotrackModal = ({ closeModal, showModal }: NoBiotrackModalProps) => {
  const [visible, setVisible] = useState(true);
  const singleAcceptation = useSelector(selectSingleAcceptation);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      lot: '',
      creationDate: '',
      expirationDate: '',
    },
  });

  useEffect(() => {
    watch(({ lot, name, expirationDate, creationDate }) => {
      setVisible(!(name && lot && expirationDate && creationDate));
    });
  }, [watch]);

  const onSubmit = async ({
    name,
    lot,
    creationDate,
    expirationDate,
  }: NoBiotrackModalInputProps) => {
    if (name && lot && creationDate && expirationDate) {
      const noBiotrack = {
        id: singleAcceptation,
        name,
        lot,
        creationDate,
        expirationDate,
      };
      dispatch(addNoBiotrack(noBiotrack));
      reset();
      closeModal();
    }
  };

  return (
    <View>
      <Center>
        <Modal isOpen={showModal} size={'xl'}>
          <Modal.Content borderRadius={16} padding={3}>
            <View style={styles.modalBody}>
              <Text style={styles.title}>Inserisci materia Non Biotrak</Text>
              <View style={styles.fieldContainer}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={styles.text} fontSize={12}>
                        Nome
                      </Text>
                      <Input
                        mt={2}
                        paddingX={8}
                        paddingLeft={4}
                        fontSize={16}
                        borderColor={palette.gray[400]}
                        borderRadius={'100'}
                        placeholderTextColor={palette.gray[200]}
                        placeholder='Olive Bianche'
                        w='100%'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name='name'
                />
                {errors.name ? (
                  <ErrorField error={'Campo nome richiesto'} />
                ) : null}
              </View>
              <View style={styles.fieldContainer}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={styles.text} fontSize={12}>
                        Lotto
                      </Text>
                      <Input
                        mt={2}
                        paddingX={8}
                        paddingLeft={4}
                        fontSize={16}
                        borderColor={palette.gray[400]}
                        borderRadius={'100'}
                        placeholderTextColor={palette.gray[200]}
                        placeholder='Es. 12345678'
                        w='100%'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name='lot'
                />
                {errors.lot ? (
                  <ErrorField error={'Campo lotto richiesto'} />
                ) : null}
              </View>
              <View style={styles.fieldContainer}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={styles.text} fontSize={12}>
                        Data di creazione
                      </Text>
                      <Input
                        mt={2}
                        paddingX={8}
                        paddingLeft={4}
                        fontSize={16}
                        borderColor={palette.gray[400]}
                        borderRadius={'100'}
                        placeholderTextColor={palette.gray[200]}
                        placeholder='dd/mm/aaaa'
                        w='100%'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name='creationDate'
                />
                {errors.creationDate ? (
                  <ErrorField error={'Campo creazione richiesto'} />
                ) : null}
              </View>
              <View style={styles.fieldContainer}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Text style={styles.text} fontSize={12}>
                        Data di scadenza
                      </Text>
                      <Input
                        mt={2}
                        paddingX={8}
                        paddingLeft={4}
                        fontSize={16}
                        borderColor={palette.gray[400]}
                        borderRadius={'100'}
                        placeholderTextColor={palette.gray[200]}
                        placeholder='dd/mm/aaaa'
                        w='100%'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </>
                  )}
                  name='expirationDate'
                />
                {errors.expirationDate ? (
                  <ErrorField error={'Campo scandenza richiesto'} />
                ) : null}
              </View>
              <VStack space={3}>
                <ButtonCustom
                  opacity={visible ? 0.4 : 1}
                  disabled={visible ? true : false}
                  color='primary'
                  title='Aggiungi alla produzione'
                  size={'lg'}
                  onPress={handleSubmit(onSubmit)}
                />
                <ButtonCustom
                  color='error'
                  variant='ghost'
                  title='Annulla'
                  size={'lg'}
                  iconLeft={<DeleteIcon />}
                  onPress={() => {
                    reset();
                    dispatch(clearNoBiotrack());
                    closeModal();
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
  text: {
    fontFamily: 'Inter-SemiBold',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 16
  },
  fieldContainer: {
    marginBottom: 12,
  },
  modalBody: {
    padding: 16
  }
});

export default NoBiotrackModal;

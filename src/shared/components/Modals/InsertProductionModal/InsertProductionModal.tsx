import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Center,
  Modal,
  Text,
  VStack,
  Input,
  DeleteIcon,
  CheckIcon,
} from 'native-base';
import { insertProductionModalProps } from '../../../../models/insertProductionModalProps';
import { palette } from '../../../palette';
import { Controller, useForm } from 'react-hook-form';
import ButtonCustom from '../../Button/ButtonCustom';
import { ErrorField } from '../../ErrorField/ErrorField';

const InsertProductionModal = ({
  showModal,
  closeModal,
  childToParent,
  childToParentLot
}: insertProductionModalProps) => {
  const [visible, setVisible] = useState(true);
  const data = 'This is data from Child Component to the Parent Component.';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      lot: ''
    },
  });

  const onSubmit = async ({ title, lot }: { title: string, lot: string }) => {
    if (title && lot) {
      childToParent(title);
      childToParentLot(lot);
    }
    reset();
    closeModal();
  };

  const customChange = (e: string) =>
    e.length > 0 ? setVisible(false) : setVisible(true);

  return (
    <View>
      <Center>
        <Modal isOpen={showModal} size={'xl'}>
          <Modal.Content borderRadius={16} padding={3}>
            <View style={styles.modalBody}>
              <VStack space={3}>
                <Text fontSize={'lg'} style={styles.title}>
                  Inserisci nome produzione
                </Text>
                <Text fontSize={'md'} style={styles.text}>
                  Dai un nome ed un lotto a questa produzione per avviarla
                </Text>
                <View style={styles.fieldContainer}>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
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
                          onKeyPress={() => customChange(value)}
                          value={value}
                        />
                      </>
                    )}
                    name='title'
                  />
                  {errors.title ? (
                    <ErrorField error={'Campo nome richiesto'} />
                  ) : null}
                </View>
                <View style={styles.fieldContainer}>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <Input
                          mt={2}
                          paddingX={8}
                          paddingLeft={4}
                          fontSize={16}
                          borderColor={palette.gray[400]}
                          borderRadius={'100'}
                          placeholderTextColor={palette.gray[200]}
                          placeholder='Numero Lotto'
                          w='100%'
                          onBlur={onBlur}
                          onChangeText={onChange}
                          onKeyPress={() => customChange(value)}
                          value={value}
                        />
                      </>
                    )}
                    name='lot'
                  />
                  {errors.title ? (
                    <ErrorField error={'Campo lotto richiesto'} />
                  ) : null}
                </View>
                <ButtonCustom
                  opacity={visible ? 0.4 : 1}
                  disabled={visible ? true : false}
                  color='primary'
                  title='Fatto'
                  iconLeft={<CheckIcon />}
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
                    closeModal();
                    childToParent('');
                    reset();
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
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 12,
  },
  modalBody: {
    padding: 24
  }
});

export default InsertProductionModal;

import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { Center, Modal, Text, VStack, DeleteIcon, CheckIcon, Stack, Box } from 'native-base';
import ButtonCustom from '../../Button/ButtonCustom';
import { palette } from '../../../palette';
import dayjs from 'dayjs';
import { ExpireSliderModalProps } from '../../../../models/ExpireSliderModalProps';
import { Slider } from '@miblanchard/react-native-slider';

const ExpireSliderModal = ({
  showModal,
  closeModal,
  childToParent,
}: ExpireSliderModalProps) => {
  const [onChangeValue, setOnChangeValue] = useState<any>(12);
  const expired = dayjs().add(Number(onChangeValue), 'M').format('DD-MM-YYYY');

  return (
    <View>
      <Center>
        <Modal isOpen={showModal} size={'xl'}>
          <Modal.Content borderRadius={20} padding={1}>
            <Modal.Body>
              <VStack space={3}>
                <Text style={styles.title} fontSize='lg'>
                  Aggiungi una scadenza
                </Text>
                <Text style={styles.text} fontSize='md'>
                  Inserisci la scadenza per questa produzione
                </Text>

                <Box alignItems='center' w='100%'>
                  <View>
                    <View style={styles.containerValue}>
                      <Text style={styles.text2} fontSize='lg'>
                        {Math.floor(Number(onChangeValue))}
                      </Text>
                    </View>
                    <Text style={styles.principal} fontSize='2xl'>
                      Mesi
                    </Text>
                    <Text style={styles.text2} fontSize='lg'>
                      ({expired})
                    </Text>
                  </View>

                  <Stack
                    space={4}
                    marginY={3}
                    alignItems='center'
                    w='80%'
                    maxW='300'
                  >
                    <View style={styles.sliderContainer}>
                      <Slider
                        value={onChangeValue}
                        onValueChange={value=>setOnChangeValue(value)}
                        minimumValue={1}
                        maximumValue={24}
                        thumbTintColor={palette.primary.default}
                        minimumTrackTintColor={palette.primary.default}
                      />
                    </View>
                  </Stack>
                </Box>

                <VStack space={3} padding={2}>
                  <ButtonCustom
                    color='primary'
                    title='Inizia produzione'
                    size={'lg'}
                    iconLeft={<CheckIcon />}
                    onPress={() => {
                      childToParent(expired);
                    }}
                  />
                  <ButtonCustom
                    variant='ghost'
                    title='Annulla'
                    color='error'
                    size={'lg'}
                    iconLeft={<DeleteIcon />}
                    onPress={() => {
                      childToParent('');
                      closeModal();
                    }}
                  />
                </VStack>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold'
  },
  text: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: palette.gray.default,
  },
  text2: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: palette.black.default,
  },
  principal: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold'
  },
  containerValue: {
    paddingVertical: 8,
    borderRadius: 80,
    borderColor: palette.muted[100],
    borderWidth: 1
  },
  sliderContainer: {
    width: '100%', 
  }
});

export default ExpireSliderModal
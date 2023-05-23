import { View, StyleSheet } from 'react-native';
import { Modal, Center, Text, DeleteIcon, CheckIcon, VStack } from 'native-base';
import React from 'react';
import ButtonCustom from '../../Button/ButtonCustom';
import { DetailModalProps } from '../../../../models/DetailModalProps';
import StampTypeOfTrack from '../../StampTypeOfTrack/StampTypeOfTrack';

const DetailModal = ({showModal, closeModal, navigate, title, id, expirationeDate, createDate, lot, type}: DetailModalProps) => {

    return (
      <View>
        <Center>
          <Modal borderRadius={24} isOpen={showModal} size={'xl'}>
            <Modal.Content borderRadius={24} padding={3}>
              <Modal.Body>
                <Text fontSize={'2xl'} style={styles.title}>
                  {title}
                </Text>
                <VStack space={3}>
                  <View style={styles.container}>
                    {/* <Text fontSize={'md'} style={styles.text}>
                      ID <Text style={styles.span}>{id}</Text>
                    </Text> */}
                    {typeof id === 'string' && id.slice(0, 3) === 'BT-' ? (
                      <StampTypeOfTrack biotrack={true} />
                    ) : (
                      <StampTypeOfTrack biotrack={false} />
                    )}
                  </View>
                  <Text fontSize={'md'} style={styles.text}>
                    Data di creazione{' '}
                    <Text style={styles.span}>{createDate}</Text>
                  </Text>
                  <Text fontSize={'md'} style={styles.text}>
                    Data di scadenza{' '}
                    <Text style={styles.span}>{expirationeDate}</Text>
                  </Text>
                  <Text fontSize={'md'} style={styles.text}>
                    Tipo <Text style={styles.span}>{type}</Text>
                  </Text>
                  <Text fontSize={'md'} style={styles.text}>
                    Lotto <Text style={styles.span}>{lot}</Text>
                  </Text>
                  <ButtonCustom
                    iconLeft={<CheckIcon />}
                    color='primary'
                    title='Conferma'
                    size={'lg'}
                    onPress={navigate}
                  />
                  <ButtonCustom
                    color='error'
                    variant='ghost'
                    title='Annulla'
                    size={'lg'}
                    iconLeft={<DeleteIcon />}
                    onPress={closeModal}
                  />
                </VStack>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </Center>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'},
    text: {
        fontFamily: 'Inter-Regular',
    },
    title: {
        fontFamily: 'Inter-SemiBold',
        marginBottom: 16
    },
    span: {
        fontFamily: 'Inter-SemiBold'
    }
})

export default DetailModal
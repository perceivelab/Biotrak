import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Modal, Center, Text, VStack } from 'native-base';
import { ErrorModalProps } from '../../../../models/ErrorModalProps';
import { SvgXml } from 'react-native-svg';
import { warning } from '../../../../../assets/svg/svg';
import ButtonCustom from '../../Button/ButtonCustom';

const ErrorModal = ({
  showModal,
  closeModal,
  title,
  text,
}: ErrorModalProps) => {
  return (
    <View>
      <Center>
        <Modal isOpen={showModal} size={'xl'}>
          <Modal.Content borderRadius={24}>
            <Modal.Body>
              <VStack space={2} padding={1}>
                <View style={{ alignItems: 'center' }}>
                  <SvgXml xml={warning} />
                  <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.text}>{text}</Text>
                <ButtonCustom
                  title='Ho Capito'
                  color='primary'
                  size={'lg'}
                  onPress={closeModal}
                />
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        marginVertical: 18,
        textAlign: 'center',
        fontFamily: 'Inter-regular',
        fontSize: 16
    },
    title: {
        textAlign: 'center',
        marginTop: 16,
        fontFamily: 'Inter-SemiBold',
        fontSize: 18
    }
})

export default ErrorModal
import { Text, StyleSheet, View } from 'react-native';
import React from 'react'
import { Modal, Center, Spinner } from "native-base";
import { LoadModalProps } from '../../../../models/LoadModalProps';
import { palette } from '../../../palette';

const LoadModal = ({showModal, text}: LoadModalProps) => {
  
  return (
  <View>
    <Center>
        <Modal isOpen={showModal} size={'lg'}>
          <Modal.Content borderRadius={18}>          
            <Modal.Body>
              <Spinner padding={5} size="lg" color={palette.primary.default} accessibilityLabel="Loading posts" />
              <Text style={styles.text}>{text}</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
    </Center>
  </View>)

}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold'
  }
})

export default LoadModal
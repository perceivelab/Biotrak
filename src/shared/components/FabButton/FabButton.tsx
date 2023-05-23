import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Stagger,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { palette } from '../../palette';
import { FabButtonProps } from '../../../models/FabButtonProps';
import { SvgXml } from 'react-native-svg';
import { numbers, qr } from '../../../../assets/svg/svg';
import { goToScanner } from '../../../helpers/goToScannerFromType';
import InsertCodeModal from '../Modals/InsertCodeModal/InsertCodeModal';
import { ActionType } from '../../../helpers/ActionType';
import LoadModal from '../Modals/LoadModal/LoadModal';
import { removeSingle } from '../../../store/singleAcceptation/singleAcceptation.actions';
import { useDispatch } from 'react-redux';
import { clearNoBiotrack } from '../../../store/noBiotrack/noBiotrack.actions';

const FabButton = ({ opacity, type }: FabButtonProps) => {
  const { isOpen, onToggle } = useDisclose();
  const dispatch = useDispatch();
  const [loadModalShow, setLoadModalShow] = useState(false);
  const [insertCodeModalShow, setInsertCodeModalShow] = useState(false);
  const [visibilityFab, setVisibilityFab] = useState(false);

  useEffect(() => {
    dispatch(removeSingle());
    dispatch(clearNoBiotrack());
  }, [isOpen]);
  

  return (
    <>
      <View style={{ display: visibilityFab ? 'flex' : 'none' }}>
        <LoadModal showModal={loadModalShow} text={"Attendi l'accettazione"} />
        <InsertCodeModal
          textButton={ActionType[type]}
          showModal={insertCodeModalShow}
          closeModal={() => {
            setVisibilityFab(false);
            setInsertCodeModalShow(false);
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          right: 30,
          bottom: 100,
        }}
      >
        <Box style={{ display: visibilityFab ? 'none' : undefined }}>
          <Stagger
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: 'spring',
                mass: 0.4,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <VStack space={4} justifyContent={'center'}>
              <HStack
                onTouchStart={() => {
                  setTimeout(() => {
                    setLoadModalShow(true);
                    goToScanner(type);
                    onToggle();
                    opacity();
                  }, 1000);
                }}
                justifyContent={'space-between'}
              >
                <Text style={styles.label} mr={1}>
                  {type === 'productionStart' ? 'Qr e Barcode' : 'Qr Biotrack'}
                </Text>
                <SvgXml xml={qr} width='60px' height='60px' />
              </HStack>
              <HStack
                onTouchStart={() => {
                  setVisibilityFab(true);
                  setInsertCodeModalShow(true);
                  onToggle();
                  opacity();
                }}
                justifyContent={'space-between'}
              >
                <Text style={styles.label}>
                  {type === 'productionStart' ? 'Numero ID' : 'ID Biotrack'}
                </Text>
                <SvgXml xml={numbers} width='60px' height='60px' />
              </HStack>
            </VStack>
          </Stagger>
        </Box>
        <HStack
          style={{ display: visibilityFab ? 'none' : undefined }}
          mr={0.5}
          alignItems='center'
          justifyContent='flex-end'
        >
          <IconButton
            variant='solid'
            borderRadius='full'
            size={'56px'}
            onPress={() => {
              onToggle();
              opacity();
            }}
            mt='24px'
            bg={palette.primary.default}
            icon={
              <Icon
                color='white'
                as={AntDesign}
                name={isOpen ? 'close' : 'plus'}
                size='lg'
              />
            }
          />
        </HStack>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: palette.black.secondary,
  },
});

export default FabButton;
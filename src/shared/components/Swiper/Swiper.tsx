import { ArrowForwardIcon, Box, HStack } from 'native-base';
import React, { useRef } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { start, stop, vehicle } from '../../../../assets/svg/svg';
import useAuth from '../../../hooks/useAuth';
import { SwiperProps } from '../../../models/SwiperProps';
import { palette } from '../../palette';
import ButtonCustom from '../Button/ButtonCustom';

const SwiperComponent = ({ onPress }: SwiperProps) => {
  const swiper: any = useRef(null);
  return (
    <>
      <Swiper
        ref={swiper}
        buttonWrapperStyle={{
          backgroundColor: 'transparent',
        }}
        paginationStyle={{ bottom: 324 }}
        dot={
          <View
            style={{
              backgroundColor: palette.primary.variant,
              width: 18,
              height: 8,
              borderRadius: 4,
              margin: 4,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: palette.primary.default,
              width: 36,
              height: 8,
              borderRadius: 4,
              margin: 4,
            }}
          />
        }
        loop={false}
      >
        {/* SLIDE 1 */}
        <View style={[styles.container]}>
          <View style={styles.circle}>
            {<SvgXml xml={vehicle} width='100%' height='100%' />}
          </View>
          <View style={styles.body}>
            <Text style={styles.textTitle}>Traccia la filiera alimentare</Text>
            <Text style={styles.text}>
              Descrivi il percorso di un lotto di produzione registrando il
              flusso di informazioni ad ogni passaggio della catena di
              distribuzione.
            </Text>
          </View>
          <HStack space={3} justifyContent='center'>
            <Box width={'48%'}>
              <ButtonCustom
                variant='outline'
                color='primary'
                title='Salta'
                size={'lg'}
                onPress={onPress}
              />
            </Box>
            <Box width={'48%'}>
              <ButtonCustom
                color='primary'
                title='Avanti'
                size={'lg'}
                iconRight={
                  <ArrowForwardIcon marginLeft='1' size={4} color='white' />
                }
                onPress={() => {
                  swiper.current && swiper.current.scrollBy(1);
                }}
              />
            </Box>
          </HStack>
        </View>
        {/* SLIDE 2 */}
        <View style={[styles.container]}>
          <View style={styles.circle}>
            {<SvgXml xml={start} width='100%' height='100%' />}
          </View>
          <View style={styles.body}>
            <Text style={styles.textTitle}>Crea nuove produzioni</Text>
            <Text style={styles.text}>
              Inserisci nuove produzioni all’interno della catena di
              monitoraggio di BioTrak per una corretta tracciabilità delle
              materie prime e dei processi.
            </Text>
          </View>
          <HStack space={3}>
            <Box width={'48%'}>
              <ButtonCustom
                variant='outline'
                color='primary'
                title='Salta'
                size={'lg'}
                onPress={onPress}
              />
            </Box>
            <Box width={'48%'}>
              <ButtonCustom
                color='primary'
                title='Avanti'
                size={'lg'}
                iconRight={
                  <ArrowForwardIcon marginLeft='1' size={4} color='white' />
                }
                onPress={() => {
                  swiper.current && swiper.current.scrollBy(1);
                }}
              />
            </Box>
          </HStack>
        </View>
        {/* SLIDE 3 */}
        <View style={[styles.container]}>
          <View style={styles.circle}>
            {<SvgXml xml={stop} width='100%' height='100%' />}
          </View>
          <View style={styles.body}>
            <Text style={styles.textTitle}>Dal campo alla tua tavola</Text>
            <Text style={styles.text}>
              Ricostruisci e segui il percorso di un prodotto alimentare
              attraverso le fasi di produzione, trasformazione e distribuzione.
            </Text>
          </View>
          <HStack>
            <Box width={'100%'}>
              <ButtonCustom
                color='primary'
                title='Fine'
                size={'lg'}
                iconRight={
                  <ArrowForwardIcon marginLeft='1' size={4} color='white' />
                }
                onPress={onPress}
              />
            </Box>
          </HStack>
        </View>
      </Swiper>
    </>
  );
};


const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
    paddingBottom: 90
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    paddingBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 96,
    backgroundColor: palette.white.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: palette.gray[800],
    fontFamily: 'Inter-SemiBold'
  },
  text: {
    padding: 8,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '400',
    color: palette.gray[300],
    fontFamily: 'Inter-Regular'
  },
});

export default SwiperComponent;

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { palette } from '../../palette';
import { Avatar, Box, HStack, VStack, Text } from 'native-base';
import { SvgXml } from 'react-native-svg';
import { CardProps } from '../../../models/CardProps';

const CardCustom = ({text, customFlex, imgSource, goTo}: CardProps) => {
    return (
        <TouchableOpacity onPress={goTo}>
            <Box
                bg='white'
                px='4'
                py='3'
                rounded='2xl'
                _text={{
                    fontSize: 'md',
                    fontWeight: 'medium',
                    color: 'black',
                    textAlign: 'center',
                }}
            >
                <HStack>
                    <VStack space={2}>
                        <HStack space={5} alignItems='center' style={{flexDirection: customFlex}}>
                                <Avatar alignSelf={'flex-start'} bg={palette.white.contrast} mb='8px' size='lg'>{
                                    <SvgXml xml={imgSource} width="40%" height="40%" />
                                }
                                </Avatar>
                                <View style={{flexDirection: customFlex}}>
                                    <Text style={[styles.text, customFlex == 'column' && {paddingTop: 8}]}>
                                        {text}
                                    </Text>
                                </View>
                            
                        </HStack>
                    </VStack>
            </HStack>
            </Box>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
        fontFamily: 'Inter-SemiBold',
        fontSize: 16
    }
})

export default CardCustom;
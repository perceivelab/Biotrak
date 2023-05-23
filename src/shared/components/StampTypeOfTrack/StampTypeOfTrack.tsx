import { View, StyleSheet } from 'react-native';
import React from 'react';
import { StampTypeOfTrackProps } from '../../../models/StampTypeOfTrackProps';
import { SvgXml } from 'react-native-svg';
import { question, scanBiotrack } from '../../../../assets/svg/svg';
import { Text } from "native-base";
import { palette } from '../../palette';

const StampTypeOfTrack = ({biotrack}:StampTypeOfTrackProps) => {

    return (
        <>
        {
            biotrack ?
            <View style={styles.textBiotrack}>
                <SvgXml xml={scanBiotrack} />
                <Text marginLeft={1} fontSize={'xs'}>BIOTRACK</Text>
            </View>
            : 
            <View style={styles.textNonBiotrak}>
                <SvgXml xml={question} />
                <Text marginLeft={1} fontSize={'xs'}>NON BIOTRACK</Text>
            </View>
        }
        </>    
    )
}

const styles = StyleSheet.create({
    textNonBiotrak: {
        fontFamily: 'Inter-Regular',
        backgroundColor: palette.info[100],
        color: palette.primary[900],
        padding: 1,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8
    },
    textBiotrack: {
        fontFamily: 'Inter-Regular',
        backgroundColor: palette.success[100],
        color: palette.success[900],
        padding: 1,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8
    }
})

export default StampTypeOfTrack
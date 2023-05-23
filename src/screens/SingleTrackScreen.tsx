import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenFC from '../models/ScreenFC';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTrack from '../hooks/useTrack';
import { Track } from '../models/TrackModel';

const SingleTrackScreen: ScreenFC<'SingleTrack'> = ({ route }) => {
  const { getHistoryTrack } = useTrack();
  const [track, setTrack] = useState<Track>();
  
  const getData = async () => {
    try {
      const trackID = route.params?.id;
      trackID && (await getHistoryTrack(trackID).then((response) => {
        setTrack(response.data)
      }))
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {track ? (
            <>
              <View>
                {track.supplyChain
                  .map((item, id) => {
                    return (
                      <View key={id}>
                        <Text>ID: {item.id}</Text>
                        <Text>NAME: {item.name}</Text>
                        <Text>EVENT: {item.event}</Text>
                        <Text>TYPE: {item.type}</Text>
                      </View>
                    );
                  })}
              </View>
            </>
          ) : (
            <Text>Non ho trovato tracce del prodotto</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SingleTrackScreen;

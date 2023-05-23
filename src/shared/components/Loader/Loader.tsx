import { Heading, Spinner } from 'native-base';
import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { palette } from '../../palette';

const Loader = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent />
      {/* <Image source={require('./loader.png')} style={styles.image} /> */}
        <Spinner
          accessibilityLabel='Loading'
          size={50}
          color={palette.primary.default}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 50,
  }
});

export default Loader;

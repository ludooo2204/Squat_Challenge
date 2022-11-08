import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AffichageSquat from './AffichageSquat';
import AddSquat from './AddSquat';
import FinSession from './FinSession';
import Navbar from './Navbar';

const Home = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}
      <AddSquat />
      <AffichageSquat />
      <FinSession />
      <Navbar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

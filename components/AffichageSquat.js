import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const AffichageSquat = () => {
  const squats = useSelector(state => state.squats);
  console.log('squats from Aff');
  console.log(squats);
  Alert.alert('probleme export online revoir backend');
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.squat}>Nombre de squats de la session :</Text>
        <Text style={styles.nbrSquat}>{squats.length}</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.squat}>Nombre de squats total :</Text>
        <Text style={styles.nbrSquat}>{squats.length}</Text>
      </View>
    </View>
  );
};

export default AffichageSquat;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squat: {
    fontSize: 20,
    textAlign: 'center',
  },
  nbrSquat: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
});

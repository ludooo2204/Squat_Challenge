import axios from 'axios';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addSquatsTotal } from '../redux/actionCompteur';

const AffichageSquat = () => {
  const dispatch = useDispatch();

  const squatsTotal = useSelector(state => state.squatsTotal);
  const squatsSession = useSelector(state => state.squatsSession);
  // const store = useSelector(state => state);
  useEffect(() => {
    axios
      .get('https://lomano.fr/apiLudo/squat')
      .then(data => dispatch(addSquatsTotal(data.data)));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.squat}>Nombre de squats de la session :</Text>
        <Text style={styles.nbrSquat}>
          {squatsSession ? squatsSession.length : 0}
        </Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.squat}>Nombre de squats total :</Text>
        <Text style={styles.nbrSquat}>
          {squatsTotal ? squatsTotal.length : 0}
        </Text>
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

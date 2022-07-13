/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector} from 'react-redux';

const FinSession = () => {
  const squats = useSelector(state => state.squats);
  console.log('coucou');
  const saveSquats = async () => {
    console.log('save data');
    try {
      const jsonValue = JSON.stringify(squats);
      await AsyncStorage.setItem('squats', jsonValue);

      axios
        .post('https://lomano.fr/apiLudo/squat', {squats})
        .then(e => console.log('squat posté', e.data))
        .catch(err => console.log('err', err));
    } catch (e) {
      // saving error
      console.log('error');
      console.log(e);
    }
  };

  return (
    <Pressable style={styles.pressableButton} onPress={saveSquats}>
      <Text style={styles.squat}> save data </Text>
    </Pressable>
  );
};
export default FinSession;
const styles = StyleSheet.create({
  pressableButton: {
    padding: 10,
    margin: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 30,
  },
  squat: {
    fontSize: 20,
  },
});

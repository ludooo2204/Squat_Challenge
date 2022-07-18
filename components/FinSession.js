/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {
  addSquatsTotal,
  atsTotal,
  resetSquatsSession,
} from '../redux/actionCompteur';
import {readSquatStored} from '../helpers/functions';

const FinSession = () => {
  const squatsSession = useSelector(state => state.squatsSession);
  const dispatch = useDispatch();
  const saveSquats = async () => {
    if (squatsSession.length > 0) {
      console.log('save data');
      try {
        let dataStored = await readSquatStored();
        if (dataStored) {
          dataStored = JSON.parse(dataStored);
          dataStored = [...dataStored, ...squatsSession];
          const jsonValue = JSON.stringify(dataStored);
          await AsyncStorage.setItem('squats', jsonValue);
        } else {
          await AsyncStorage.setItem('squats', JSON.stringify(squatsSession));
        }

        axios
          .post('https://lomano.fr/apiLudo/squat', {data: squatsSession})
          .then(e => {
            console.log('squat posté');
            dispatch(resetSquatsSession());
            if (dataStored) {
              dispatch(addSquatsTotal(dataStored));
            } else {
              dispatch(addSquatsTotal(squatsSession));
            }
          })
          .catch(err => console.log('err', err));
      } catch (e) {
        // saving error
        console.log('error');
        console.log(e);
      }
    } else {
      console.log('pas de squat dans la session!');
    }
  };

  return (
    <Pressable style={styles.pressableButton} onPress={saveSquats}>
      <Text style={styles.squat}> Fin de session </Text>
    </Pressable>
  );
};
export default FinSession;
const styles = StyleSheet.create({
  pressableButton: {
    padding: 20,
    margin: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  },
  squat: {
    fontSize: 30,
    fontWeight: '900',
  },
});

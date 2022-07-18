/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addSquatSession} from '../redux/actionCompteur';

const AddSquat = () => {
  const dispatch = useDispatch();
  const handleSquat = () => {
    let time = +new Date();
    console.log('time');
    console.log(time);
    console.log('typeof time');
    console.log(typeof time);
    dispatch(addSquatSession(time));
  };

  return (
    <Pressable style={styles.pressableSquat} onPress={handleSquat}>
      <Text style={styles.plus}> + </Text>
    </Pressable>
  );
};

export default AddSquat;
const styles = StyleSheet.create({
  pressableSquat: {
    padding: 100,
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    marginTop: 50,
    borderColor: 'black',
    borderWidth: 2,
    // height: 300,
    // width: 300,
  },
  plus: {
    fontSize: 150,
  },
});

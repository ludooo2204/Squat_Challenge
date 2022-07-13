import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addSquat} from '../redux/actionCompteur';

const AddSquat = () => {
  const dispatch = useDispatch(addSquat);
  const squats = useSelector(state => state.squats);
  console.log('squats');
  console.log(squats);
  return (
    <Pressable
      style={styles.pressableSquat}
      onPress={() => dispatch(addSquat())}>
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
    // height: 300,
    // width: 300,
  },
  plus: {
    fontSize: 150,
  },
});

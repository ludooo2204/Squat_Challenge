import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {
  readSquatOnline,
  readSquatStored,
  removeSquats,
} from '../helpers/functions';

const Navbar = () => {
  const handleOnline = async () => {
    const {data} = await readSquatOnline();
    console.log(data);
  };
  return (
    <>
      <Pressable style={styles.pressableButton} onPress={removeSquats}>
        <Text style={styles.squat}> remove data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={readSquatStored}>
        <Text style={styles.squat}> read data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={handleOnline}>
        <Text style={styles.squat}> read data online </Text>
      </Pressable>
    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  squat: {
    fontSize: 20,
  },
  pressableSquat: {
    padding: 100,
    backgroundColor: 'lightgrey',
    borderRadius: 30,
  },
  pressableButton: {
    padding: 10,
    margin: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 30,
  },
});

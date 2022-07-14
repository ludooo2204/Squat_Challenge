import axios from 'axios';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {readSquatStored, removeSquats, storeData} from '../helpers/functions';
import {addSquats, isConnected} from '../redux/actionCompteur';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

const Navbar = () => {
  const dispatch = useDispatch();
  const isWebConnected = useSelector(state => state.isConnected);
  const squats = useSelector(state => state.squats);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      dispatch(isConnected(state.isConnected));
    });
  }, []);

  useEffect(() => {
    console.log('isWebConnected');
    console.log(isWebConnected);
    // isWebConnected != null && isWebConnected
    //   ? handleSquatsOnline()
    //   : handleSquatsStored();
    if (isWebConnected) {
      handleSquatsOnline();
    } else {
      console.log('isWebConnected');
      console.log('isWebConnected');
      console.log('isWebConnected');
      console.log('isWebConnected');
      console.log(isWebConnected);
      handleSquatsStored();
    }
  }, [isWebConnected]);

  const handleSquatsOnline = async () => {
    console.log('read squats online');
    const {data} = await axios.get('https://lomano.fr/apiLudo/squat');
    dispatch(addSquats(data));
  };
  const handleSquatsStored = async () => {
    console.log('read squats stored');
    const data = await readSquatStored();
    dispatch(addSquats(JSON.parse(data)));
  };
  return (
    <>
      <Pressable
        style={styles.pressableButton}
        onPress={() => storeData(squats)}>
        <Text style={styles.squat}> store data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={removeSquats}>
        <Text style={styles.squat}> remove data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={handleSquatsStored}>
        <Text style={styles.squat}> read data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={handleSquatsOnline}>
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

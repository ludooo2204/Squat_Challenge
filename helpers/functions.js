import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

/* eslint-disable prettier/prettier */
export const readSquatStored = async () => {
  try {
    const value = await AsyncStorage.getItem('squats');
    if (value !== null) {
      // value previously stored
      // console.log('value read from async storage');
      // console.log('value read from async storage');
      // console.log('value read from async storage');
      // console.log('value read from async storage');
      // console.log(value);
      return value;
    } else {
      console.log('no values on storage !!');
    }
  } catch (e) {
    // error reading value
    console.log('error');
    console.log(e);
  }
};
export const storeData = async data => {
  console.log('read data stored');

  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('squats', jsonValue);
    console.log('data stored!');
    console.log(data);
  } catch (e) {
    // error reading value
    console.log('error');
    console.log(e);
  }
};

export const removeSquats = () => {
  console.log('remobe???');
  Alert.alert(
    'Confirmation',
    'Etes-vous sur de vouloir supprimer toutes vos données ??',
    [
      {
        text: 'Cancel',
        // onPress: () => console.log("Cancel Pressed"),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          console.log('supprimer data');

          try {
            await AsyncStorage.removeItem('squats');
            console.log('squats erased');
          } catch (e) {
            // remove error
            console.log('error');
            console.log(e);
          }

          console.log('Done.');
        },
      },
    ],
  );
};

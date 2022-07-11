import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
// import {DeviceMotion} from 'expo-sensors';
import React, {useEffect, useState} from 'react';
// import {LineChart} from 'react-native-chart-kit';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import store from './store/store';
// import {Provider} from 'react-redux';
import axios from 'axios';

export default function App() {
  const [squats, setSquats] = useState([]);
  const [squatsOnline, setSquatsOnline] = useState(null);

  const addSquat = () => {
    let time = +new Date();
    setSquats(squats => [...squats, time]);
  };
  const removeSquats = () => {
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
  const saveSquats = async () => {
    console.log('save data');
    try {
      const jsonValue = JSON.stringify(squats);
      await AsyncStorage.setItem('squats', jsonValue);
      console.log('squats');
      console.log(squats);
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
  const readSquatStored = async () => {
    console.log('read data stored');

    try {
      const value = await AsyncStorage.getItem('squats');
      if (value !== null) {
        // value previously stored
        console.log('value read from async storage');
        console.log(value);
      }
    } catch (e) {
      // error reading value
      console.log('error');
      console.log(e);
    }
  };
  const readSquatOnline = async () => {
    console.log('read data online');

    try {
      let url = 'https://lomano.fr/apiLudo/squat';
      fetch(url)
        .then(e => e.text())
        .then(t => console.log(t));
      // axios
      //   .get('https://lomano.fr/apiLudo/squat')
      //   .then(e => {
      //     if (e.data) {
      //       setSquatsOnline(e.data);
      //     }
      //   })
      //   .catch(err => console.log('err', err));
    } catch (e) {
      // error reading value
      console.log('error');
      console.log(e);
    }
  };
  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <Pressable style={styles.pressableSquat} onPress={addSquat}>
        <Text style={styles.plus}> + </Text>
      </Pressable>
      <Text style={styles.squat}> squats : {squats.length}</Text>
      <Pressable style={styles.pressableButton} onPress={saveSquats}>
        <Text style={styles.squat}> save data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={removeSquats}>
        <Text style={styles.squat}> remove data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={readSquatStored}>
        <Text style={styles.squat}> read data </Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={readSquatOnline}>
        <Text style={styles.squat}> read data online </Text>
      </Pressable>
      {squatsOnline && squatsOnline.length && (
        <Text>{squatsOnline.length} squats total !!</Text>
      )}
    </View>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 150,
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

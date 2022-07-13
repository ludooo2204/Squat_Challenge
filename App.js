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
import store from './store/store';
import {Provider} from 'react-redux';
import Compteur from './components/Compteur';
import AffichageSquat from './components/AffichageSquat';
import AddSquat from './components/AddSquat';
import FinSession from './components/FinSession';
import Navbar from './components/Navbar';

export default function App() {
  const [squats, setSquats] = useState([]);
  const [squatsOnline, setSquatsOnline] = useState(null);
  // const dispatch = useDispatch();

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AddSquat />
        <AffichageSquat />
        <FinSession />
        <Navbar />
        {squatsOnline && squatsOnline.length && (
          <Text>{squatsOnline.length} squats total !!</Text>
        )}
      </View>
    </Provider>
  );
}

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

import axios from 'axios';
import React, {useEffect} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {readSquatStored, removeSquats, storeData} from '../helpers/functions';
import {
  addSquatsTotal,
  addSquatSession,
  isConnected,
} from '../redux/actionCompteur';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

const GestionDonnées = () => {
  const dispatch = useDispatch();
  const isWebConnected = useSelector(state => state.isConnected);
  const squats = useSelector(state => state.addSquatSession);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      dispatch(isConnected(state.isConnected));
    });
  }, []);

  useEffect(() => {
    console.log('isWebConnected ???');
    console.log(isWebConnected);

    if (isWebConnected == false) {
      handleSquatsStored();
    } else {
      handleSquatsOnline();
    }
  }, [isWebConnected]);

  const importData = async _data => {
    storeData(_data);
    let dataStored = await readSquatStored();
    if (dataStored) {
      dataStored = JSON.parse(dataStored);
    }
    const {data} = await axios.get('https://lomano.fr/apiLudo/squat');
    Alert.alert(
      'Confirmation',
      'Vos données online ont été importés avec succès !',
    );
  };
  const exportData = async _data => {
    let dataStored = await readSquatStored();
    if (dataStored) {
      dataStored = JSON.parse(dataStored);
    }

    axios
      .post('https://lomano.fr/apiLudo/squat', {data: dataStored})

      .then(e => {
        Alert.alert(
          'Confirmation',
          'Vos données locales ont été exportés avec succès !',
        );
        console.log('squat posté');
      })
      .catch(err => console.log('err', err));
  };

  const handleSquatsOnline = async () => {
    console.log('read squats online');

    const {data} = await axios.get('https://lomano.fr/apiLudo/squat');
    dispatch(addSquatsTotal(data));

    let dataStored = await readSquatStored();

    if (dataStored) {
      dataStored = JSON.parse(dataStored);
    }
    let isSynchronized;
    if (data.length == 0 && dataStored == undefined) {
      isSynchronized = true;
    } else {
      isSynchronized = JSON.stringify(data) == JSON.stringify(dataStored);
    }
    console.log('isSynchronized');
    console.log(isSynchronized);
    console.log('data online');
    console.log(data);
    console.log('dataStored locale');
    console.log(dataStored);

    if (!isSynchronized) {
      if (dataStored == undefined && data.length > 0) {
        Alert.alert(
          'Alerte',
          'Pas de données locales, \n voulez-vous importer vos données online? ',
          [
            {
              text: 'annuler',
              style: 'cancel',
            },
            {
              text: 'Importer les données online',
              onPress: () => importData(data),
              // onPress: () => exportData(dataStored),
            },
          ],
        );
      } else if (data.length == 0 && dataStored != undefined) {
        Alert.alert(
          'Alerte',
          'Pas de données online, \n voulez-vous exporter vos données locales ? ',
          [
            {
              text: 'annuler',
              style: 'cancel',
            },
            {
              text: 'Exporter les données locales',
              onPress: () => exportData(dataStored),
              // onPress: () => exportData(dataStored),
            },
          ],
        );
      } else {
        Alert.alert(
          'Alerte',

          'Vos données locales et online ne sont pas les mêmes \n' +
            dataStored.length +
            ' squats locales \n' +
            data.length +
            ' squats onlines \n  voulez-vous importer vos données online ou exporter vos données locales? ',
          [
            {
              text: 'annuler',
              style: 'cancel',
            },
            {
              text: 'exporter les données locales',
              onPress: () => exportData(dataStored),
            },
            {
              text: 'Importer les données online',
              onPress: () => importData(data),
              // onPress: () => exportData(dataStored),
            },
          ],
        );
      }
    }
  };
  const handleSquatsStored = async () => {
    console.log('read squats stored');
    const data = await readSquatStored();
    dispatch(addSquatsTotal(JSON.parse(data)));
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableButton}
        onPress={() => storeData(addSquatSession)}>
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
    </View>
  );
};

export default GestionDonnées;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  squat: {
    textAlign: 'center',
    fontSize: 20,
  },

  pressableButton: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 2,
    flex: 1,
    marginHorizontal: 3,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    justifyContent: 'center',
    height: 70,
  },
});

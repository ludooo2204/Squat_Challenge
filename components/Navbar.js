import axios from 'axios';
import React, {useEffect} from 'react';
import {Alert, Pressable, StyleSheet, Text} from 'react-native';
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
    console.log('isWebConnected ???');
    console.log(isWebConnected);
    // isWebConnected != null && isWebConnected
    //   ? handleSquatsOnline()
    //   : handleSquatsStored();
    if (isWebConnected == false) {
      // console.log('isWebConnected');
      // console.log('isWebConnected');
      // console.log('isWebConnected');
      // console.log('isWebConnected');
      // console.log(isWebConnected);
      handleSquatsStored();
    } else {
      handleSquatsOnline();
    }
  }, [isWebConnected]);

  const importData = async _data => {
    storeData(_data);
    const dataStored = JSON.parse(await readSquatStored());
    const {data} = await axios.get('https://lomano.fr/apiLudo/squat');

    Alert.alert(
      'Confirmation',
      'Vos données online ont été importés avec succès !\n\n locales => ' +
        dataStored.length +
        ' squats \n onlines => ' +
        data.length +
        ' squats ',
    );
  };
  const exportData = async _data => {
    const dataStored = JSON.parse(await readSquatStored());

    console.log(dataStored);
    axios
      .post('https://lomano.fr/apiLudo/squat', {dataStored})
      .then(e => console.log('squat posté', e.data))
      .catch(err => console.log('err', err));

    const {data} = await axios.get('https://lomano.fr/apiLudo/squat');

    Alert.alert(
      'Confirmation',
      'Vos données locales ont été exportés avec succès !\n\n locales => ' +
        dataStored.length +
        ' squats \n onlines => ' +
        data.length +
        ' squats ',
    );
  };
  const handleSquatsOnline = async () => {
    console.log('read squats online');
    const {data} = await axios.get('https://lomano.fr/apiLudo/squat');
    dispatch(addSquats(data));

    const dataStored = JSON.parse(await readSquatStored());
    console.log('synchrone??');
    console.log('pk 2 fois???????????????');
    const isSynchronized = JSON.stringify(data) == JSON.stringify(dataStored);
    console.log('data.length');
    console.log(data.length);
    console.log('dataStored.length');
    console.log(dataStored.length);
    console.log(isSynchronized);
    if (!isSynchronized) {
      Alert.alert(
        'Alerte',
        'Vos données en ligne ne sont pas les memes que les locales \nLesquelles voulez-vous garder?\n\n locales => ' +
          dataStored.length +
          ' squats \n onlines => ' +
          data.length +
          ' squats ',
        [
          {
            text: 'Importer les données online',
            onPress: () => importData(data),
            style: 'cancel',
          },
          {
            text: 'Exporter les données locales',
            onPress: () => exportData(dataStored),
          },
        ],
      );
    }
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

import {StatusBar} from 'expo-status-bar';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DeviceMotion} from 'expo-sensors';
import {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store/store';
import {Provider} from 'react-redux';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [squats, setSquats] = useState([]);
  const [nbrSquats, setNbrSquats] = useState([]);
  const [dataArray, setDataArray] = useState([0]);
  const [chartIsVisible, setChartVisible] = useState(false);
  // useEffect(() => {
  // 	if (squats.length > 0) {
  // 		console.log(squats[squats.length - 1])
  // 		axios
  // 			.post("https://lomano.fr/apiLudo/squat", { squat: squats[squats.length - 1] })
  // 			.then((e) => console.log("squat posté", e.data))
  // 			.catch((err) => console.log("err", err));
  // 	}
  // }, [squats]);

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };

  const _fast = () => {
    DeviceMotion.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener(DeviceMotionData => {
        const data = DeviceMotionData.acceleration;

        const acceleration =
          data.x * data.x + data.y * data.y + data.z * data.z;

        setData(Math.round(acceleration * 100) / 100);
        setDataArray(dataArray => [
          ...dataArray,
          Math.round(acceleration * 100) / 100,
        ]);
      }),
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    // _subscribe();
    DeviceMotion.setUpdateInterval(50);

    return () => _unsubscribe();
  }, []);
  const addSquat = () => {
    let time = +new Date();
    setSquats(squats => [...squats, time]);
    setNbrSquats(nbrSquats => [...nbrSquats, squats.length]);
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
    console.log('read data');

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
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Pressable style={styles.pressableSquat} onPress={addSquat}>
          <Text style={styles.plus}> + </Text>
        </Pressable>
        <Text style={styles.squat}> squats : {squats.length}</Text>
        {/* {squats.length > 0 && (
				<LineChart
					data={{
						labels: nbrSquats,
						datasets: [
							{
								data: squats,
							},
						],
					}}
					width={Dimensions.get("window").width - 16} // from react-native
					height={220}
					yAxisLabel={"Rs"}
					chartConfig={{
						backgroundColor: "#1cc910",
						backgroundGradientFrom: "#eff3ff",
						backgroundGradientTo: "#efefef",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: "1",
							strokeWidth: "2",
							stroke: "#ffa726",
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			)} */}
        <Pressable style={styles.pressableButton} onPress={saveSquats}>
          <Text style={styles.squat}> save data </Text>
        </Pressable>
        <Pressable style={styles.pressableButton} onPress={removeSquats}>
          <Text style={styles.squat}> remove data </Text>
        </Pressable>
        <Pressable style={styles.pressableButton} onPress={readSquatStored}>
          <Text style={styles.squat}> read data </Text>
        </Pressable>
        {/* 
			<Text style={styles.text}>
				{dataArray.length}
			</Text> */}
        {/* <View style={styles.buttonContainer}>
				<Pressable onPress={() => setChartVisible(!chartIsVisible)}>
					<Text> Show graphe</Text>
				</Pressable>
				<Pressable onPress={_unsubscribe}>
					<Text> stop accelero</Text>
				</Pressable>
				<Pressable onPress={_subscribe}>
					<Text> start accelero</Text>
				</Pressable>
				{chartIsVisible && (
					<LineChart
						data={{
							// labels: dataArray,
							datasets: [
								{
									data: dataArray,
								},
							],
						}}
						width={Dimensions.get("window").width - 16} // from react-native
						height={220}
						yAxisLabel={"Rs"}
						chartConfig={{
							backgroundColor: "#1cc910",
							backgroundGradientFrom: "#eff3ff",
							backgroundGradientTo: "#efefef",
							decimalPlaces: 2, // optional, defaults to 2dp
							color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
							style: {
								borderRadius: 16,
							},
							propsForDots: {
								r: "1",
								strokeWidth: "2",
								stroke: "#ffa726",
							},
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 16,
						}}
					/>
				)}
			</View> */}
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

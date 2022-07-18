import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from './store/store';
import {Provider} from 'react-redux';
import Home from './components/Home';
import Configuration from './components/Configuration';
import Analyse from './components/Analyse';
import GestionDonnées from './components/GestionDonnées';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Configuration"
            component={Configuration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Analyse"
            component={Analyse}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GestionDonnées"
            component={GestionDonnées}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

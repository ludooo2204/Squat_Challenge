import React, {useState, useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';

//Voir pour utilisation CONNECT de react-
import {useSelector, useDispatch} from 'react-redux';

import {addCount, resetCount, addTodo} from '../redux/actionCompteur';
const Compteur = () => {
  const count = useSelector(state => state.count);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch(addCount, resetCount, addTodo);

  return (
    <View>
      <Text>Count = {count}</Text>
      <Text>todos = {todos}</Text>
      <Pressable style={{padding: 15}} onPress={() => dispatch(addCount())}>
        <Text>add count</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(resetCount())}>
        <Text>Reset Compteur</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(addTodo(Math.random()))}>
        <Text>Add todo</Text>
      </Pressable>
    </View>
  );
};

export default Compteur;

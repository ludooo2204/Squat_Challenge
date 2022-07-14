//ce fichier action permet de simplifier l'appel a la fonction addCount dans la vue

import {
  ADD_COUNT,
  RESET_COUNT,
  ADD_TODO,
  ADD_SQUAT,
  ADD_SQUATS,
  IS_CONNECTED,
} from './type';

export const addCount = () => {
  return {
    type: ADD_COUNT,
  };
};
export const resetCount = () => {
  return {
    type: RESET_COUNT,
  };
};
export const addTodo = payload => {
  return {
    type: ADD_TODO,
    payload,
  };
};
export const addSquat = payload => {
  return {
    type: ADD_SQUAT,
    payload,
  };
};
export const addSquats = payload => {
  return {
    type: ADD_SQUATS,
    payload,
  };
};
export const isConnected = payload => {
  return {
    type: IS_CONNECTED,
    payload,
  };
};

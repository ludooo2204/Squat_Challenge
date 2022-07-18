//ce fichier action permet de simplifier l'appel a la fonction addCount dans la vue

import {
  ADD_SQUAT_SESSION,
  ADD_SQUATS_TOTAL,
  RESET_SQUATS_SESSION,
  IS_CONNECTED,
} from './type';

export const addSquatSession = payload => {
  return {
    type: ADD_SQUAT_SESSION,
    payload,
  };
};
export const addSquatsTotal = payload => {
  return {
    type: ADD_SQUATS_TOTAL,
    payload,
  };
};
export const resetSquatsSession = () => {
  return {
    type: RESET_SQUATS_SESSION,
  };
};
export const isConnected = payload => {
  return {
    type: IS_CONNECTED,
    payload,
  };
};

/* eslint-disable prettier/prettier */
import {
  ADD_SQUAT_SESSION,
  ADD_SQUATS_TOTAL,
  RESET_SQUATS_SESSION,
  IS_CONNECTED,
} from './type';

//format initial du state global
const initialState = {
  squatsTotal: [],
  squatsSession: [],
  isConnected: null,
};

// le reducer permet de manipuler les actions de la vue (composant React)
// on ne manipule jamais le state directement mais une copie (comme usestate)
export const reducerCount = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SQUAT_SESSION:
      return {
        ...state,
        squatsSession: [...state.squatsSession, action.payload], //new todos array
      };
    case ADD_SQUATS_TOTAL:
      return {
        ...state,
        squatsTotal: action.payload, //new todos array
      };
    case RESET_SQUATS_SESSION:
      return {
        ...state,
        squatsSession: [], //new todos array
      };
    case IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload, //new todos array
      };

    default:
      return state;
  }
};
export default reducerCount;

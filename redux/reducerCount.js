/* eslint-disable prettier/prettier */
import {ADD_COUNT, RESET_COUNT, ADD_TODO, ADD_SQUAT} from './type';

//format initial du state global
const initialState = {
  todos: [],
  count: 0,
  squats: [],
};

// le reducer permet de manipuler les actions de la vue (composant React)
// on ne manipule jamais le state directement mais une copie (comme usestate)
export const reducerCount = (state = initialState, action) => {
  switch (action.type) {
    case RESET_COUNT:
      return {
        ...state,
        count: 0,
      };
    case ADD_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload], //new todos array
        // todos: state.todos.push(action.payload),
      };
    case ADD_SQUAT:
      return {
        ...state,
        squats: [...state.squats, action.payload], //new todos array
      };

    default:
      return state;
  }
};
export default reducerCount;

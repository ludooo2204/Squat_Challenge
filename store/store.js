import {createStore} from 'redux';
// console.log(createStore);
import {reducerCount} from '../redux/reducerCount';
const store = createStore(reducerCount);
// const store = 'toto';

export default store;

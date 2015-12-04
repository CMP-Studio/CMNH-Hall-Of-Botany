
import { combineReducers } from 'redux';
import context from './context';
import audio from './audio';

const rootReducer = combineReducers({
  context,
  audio
});

export default rootReducer;

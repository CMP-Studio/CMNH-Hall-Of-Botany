
import { combineReducers } from 'redux';
import context from './context';
import audio from './audio';
import beaconHistory from './beaconHistory';

const rootReducer = combineReducers({
  context,
  audio,
  beaconHistory,
});

export default rootReducer;

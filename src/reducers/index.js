
import { combineReducers } from 'redux';
import activeBeacon from './activeBeacon';
import audio from './audio';

const rootReducer = combineReducers({
  activeBeacon,
  audio,
});

export default rootReducer;


import { SWITCH_AUDIO } from '../actions/actions';

const React = require('react-native');
const AudioManager = React.NativeModules.AudioManager;

const initalState = {
  audioSrc: '',
  state: 'stop',
  volume: 0.0,
};

export default function audio(state = initalState, action) {
  switch (action.type) {
    case SWITCH_AUDIO:
      if (action.state == 'play') {
        if (state.audioSrc != action.audioSrc) {
          AudioManager.loadAudio(action.audioSrc);
        } else {
          AudioManager.adjustVolume(action.volume);
        }
      } else {
        AudioManager.stopAudio();
      }

      const newState = {
        audioSrc: action.audioSrc,
        state: action.state,
        volume: action.volume
      };

      return Object.assign({}, state, newState);

    default:
      return state;
  };
}
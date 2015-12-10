
import { LOAD_AUDIO, ADJUST_AUDIO_VOLUME, STOP_AUDIO, PLAY_AUDIO, PAUSE_AUDIO, AudioStates } from '../actions/actions';

const initalState = {
  audioSrc: '',
  state: AudioStates.STOPPED,
  volume: 0.0,
};

export default function audio(state = initalState, action) {
  switch (action.type) {
    case LOAD_AUDIO:
      return Object.assign({}, state, {audioSrc: action.audioSrc, state: action.state});

    case ADJUST_AUDIO_VOLUME:
      return Object.assign({}, state, {volume: action.volume});

    case STOP_AUDIO:
    case PLAY_AUDIO:
    case PAUSE_AUDIO:
      return Object.assign({}, state, {audioSrc: '', state: action.state});

    default:
      return state;
  };
}

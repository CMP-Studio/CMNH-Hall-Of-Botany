
import { LOAD_AUDIO, ADJUST_AUDIO_VOLUME, STOP_AUDIO, PLAY_AUDIO, PAUSE_AUDIO, TOGGLE_PLAY_AUDIO, AudioStates } from '../actions/actions';

const initalState = {
  audioSrc: '',
  audioState: AudioStates.STOPPED,
  volume: 0.0,
};

export default function audio(state = initalState, action) {
  switch (action.type) {
    case LOAD_AUDIO:
      return Object.assign({},
        state,
        {
          audioSrc: action.audioSrc,
          audioState: action.audioState,
        }
      );

    case ADJUST_AUDIO_VOLUME:
      return Object.assign({},
        state,
        {
          volume: action.volume,
        }
      );

    case STOP_AUDIO:
      return Object.assign({},
        state,
        {
          audioSrc: '',
          audioState: action.audioState,
        }
      );

    case TOGGLE_PLAY_AUDIO:
      let newAudioState;

      switch (state.audioState) {
        case AudioStates.PLAYING:
          newAudioState = AudioStates.PAUSED;
          break;

        case AudioStates.STOPPED:
        case AudioStates.PAUSED:
          newAudioState = AudioStates.PLAYING;
          break;

        default:
          newAudioState = state.audioState;
      }

      console.log(newAudioState);

      return Object.assign({},
        state,
        {
          audioState: newAudioState,
        }
      );

    case PLAY_AUDIO:
    case PAUSE_AUDIO:
      return Object.assign({},
        state,
        {
          audioState: action.audioState,
        }
      );

    default:
      return state;
  }
}

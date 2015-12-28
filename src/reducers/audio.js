
import { LOAD_AUDIO, ADJUST_AUDIO_VOLUME, STOP_AUDIO, PLAY_AUDIO,
         PAUSE_AUDIO, TOGGLE_PLAY_AUDIO, MUTE_AUDIO, UNMUTE_AUDIO,
         TOGGLE_MUTE_AUDIO, AudioStates } from '../actions/actions';

const initalState = {
  audioSrc: '',
  audioState: AudioStates.STOPPED,
  volume: 0.0,
  muted: false,
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

      return Object.assign({},
        state,
        {
          audioState: newAudioState,
        }
      );

    case PLAY_AUDIO:
      return Object.assign({},
        state,
        {
          audioState: action.audioState,
          volume: action.volume,
        }
      );

    case PAUSE_AUDIO:
      return Object.assign({},
        state,
        {
          audioState: action.audioState,
        }
      );

    case UNMUTE_AUDIO:
    case MUTE_AUDIO:
      return Object.assign({},
        state,
        {
          muted: action.muted,
        }
      );

    case TOGGLE_MUTE_AUDIO:
      return Object.assign({},
        state,
        {
          muted: !state.muted,
        }
      );

    default:
      return state;
  }
}

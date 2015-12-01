
import { SWITCH_CONTEXT } from '../actions/actions';

const initalState = {
    'MtRainer': {
      title: 'Mt. Rainer', 
      text: 'Lovley bird noises',
      audioSrc: 'blahBlah'},
    'None': {
      title: '', 
      text: '',
      audioSrc: ''},
  };

export default function context(state = initalState, action:number) {
  switch (action.type) {
    case SWITCH_CONTEXT:
      const index = action.index;

      switch (index) {
        case 1:
          return state.MtRainer;
        default:
          return state.None;
      };

    default:
      return state.None;
  };
}


import { SWITCH_CONTEXT } from '../actions/actions';

const initalState = {
  title: '', 
  text: '',
  audioSrc: '',
  proximity: 0,
};

export default function context(state = initalState, action) {
  switch (action.type) {
    case SWITCH_CONTEXT:
      return Object.assign({}, state, action.beaconInfo, {'proximity' : action.proximity});

    default:
      return state;
  };
}

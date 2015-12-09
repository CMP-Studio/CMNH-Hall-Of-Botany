
import { CHANGE_ACTIVE_BEACON } from '../actions/actions';

const initalState = {
  title: '', 
  text: '',
  audioSrc: '',
  proximity: 0,
};

export default function activeBeacon(state = initalState, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_BEACON:

      return Object.assign({}, 
          state, 
          action.beacon, 
          {'proximity' : action.proximity}
        );

    default:
      return state;
  };
}

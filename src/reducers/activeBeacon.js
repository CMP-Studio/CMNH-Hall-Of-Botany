
import { CHANGE_ACTIVE_BEACON, UPDATE_ACTIVE_BEACON, CLEAR_ACTIVE_BEACON, Zones } from '../actions/actions';

const initalState = {
  title: '',
  text: '',
  audioSrc: '',
  imgSrc: '',
  zone: Zones.UNKNOWN,
};

export default function activeBeacon(state = initalState, action) {
  switch (action.type) {
    case CLEAR_ACTIVE_BEACON:
      return initalState;

    case CHANGE_ACTIVE_BEACON:
      return Object.assign({},
        state,
        action.beacon,
        {
          zone: action.proximity,
        }
      );

    case UPDATE_ACTIVE_BEACON:
      return Object.assign({},
        state,
        {
          zone: action.proximity,
        }
      );

    default:
      return state;
  }
}


import { ADD_BEACON_HISTORY } from '../actions/actions';

const initalState = [];

export default function context(state = initalState, action) {
  switch (action.type) {
    case ADD_BEACON_HISTORY:
      if (state.indexOf(action.beacon) > -1) {
        return state;
      } 

      return [ 
          ...state, 
          action.beacon
        ];

    default:
      return state;
  };
}

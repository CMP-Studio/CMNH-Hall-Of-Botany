
import { CHANGE_ACTIVE_BEACON, UPDATE_ACTIVE_BEACON, NO_ACTIVE_BEACON } from '../actions/actions';

const initalState = {
  title: '', 
  text: '',
  audioSrc: '',
  rssiHistory: [],
  rssiRollingAverage: 0
};

const periodLength = 3;

export default function activeBeacon(state = initalState, action) {
  switch (action.type) {
    case NO_ACTIVE_BEACON:
      return initalState;

    case CHANGE_ACTIVE_BEACON:
      return Object.assign({}, 
          state, 
          action.beacon,
          {
            rssiHistory: [action.rssi], 
            rssiRollingAverage: action.rssi
          }
        );

    case UPDATE_ACTIVE_BEACON:
      let history = state.rssiHistory;
      let sum = 0;

      if (action.rssi !== 0) {
        history.push(action.rssi);
      }

      if (history.length > periodLength) {
        history.splice(0,1);
      }

      for (var i in history) {
        sum += history[i];
      }

      return Object.assign({}, 
        state, 
        {
          rssiHistory: history,
          rssiRollingAverage: sum / history.length,
        }
      );

    default:
      return state;
  };
}

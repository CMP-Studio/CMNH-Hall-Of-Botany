
import { CHANGE_ACTIVE_BEACON, UPDATE_ACTIVE_BEACON, CLEAR_ACTIVE_BEACON, Zones } from '../actions/actions';

const initalState = {
  title: '',
  text: '',
  audioSrc: '',
  imgSrc: '',
  rssiHistory: [],
  rssiRollingAverage: 0,
  zone: Zones.UNKNOWN,
};

const PERIOD_LENGTH = 4;
const BOUNCE_AMMOUNT = 5;

function assignZone(rssi, lastZone) {
  const signalStg = Math.round(rssi);

  let farUpperLimit = -90;
  let nearUpperLimit = -65;

  // bounce boundaries up once entering a zone to prevent noise
  // from causing constant zone changes
  if (lastZone === Zones.NEAR) {
    nearUpperLimit -= BOUNCE_AMMOUNT;
  } else if (lastZone === Zones.FAR) {
    farUpperLimit -= BOUNCE_AMMOUNT;
  }

  if (signalStg <= -1 && signalStg >= farUpperLimit) {
    if (signalStg >= nearUpperLimit) {
      return Zones.NEAR;
    } else if (signalStg >= farUpperLimit) {
      return Zones.FAR;
    }

  } else {
    return Zones.UNKNOWN;
  }
}

export default function activeBeacon(state = initalState, action) {
  switch (action.type) {
    case CLEAR_ACTIVE_BEACON:
      return initalState;

    case CHANGE_ACTIVE_BEACON:
      return Object.assign({},
        state,
        action.beacon,
        {
          rssiHistory: [action.rssi],
          rssiRollingAverage: action.rssi,
          zone: assignZone(action.rssi, state.zone),
        }
      );

    case UPDATE_ACTIVE_BEACON:
      const history = state.rssiHistory;
      let sum = 0;
      let average;

      if (action.rssi !== 0) {
        history.push(action.rssi);
      }

      if (history.length > PERIOD_LENGTH) {
        history.splice(0, 1);
      }

      for (const i of history) {
        sum += i;
      }

      average = sum / history.length;

      return Object.assign({},
        state,
        {
          rssiHistory: history,
          rssiRollingAverage: average,
          zone: assignZone(average, state.zone),
        }
      );

    default:
      return state;
  }
}

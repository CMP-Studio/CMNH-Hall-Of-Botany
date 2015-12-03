
import { SWITCH_CONTEXT, PROXIMITIES } from '../actions/actions';

const Beacons = {
    '41892:30560': {
      title: 'Mt. Rainer', 
      text: 'Lovley bird noises',
      audioSrc: 'blahBlah',
      proximity: 0},
    'None': {
      title: '', 
      text: '',
      audioSrc: '',
      proximity: 0},
  };

export default function context(state = Beacons.None, action) {
  switch (action.type) {
    case SWITCH_CONTEXT:
      let detectedProximity = 0;

      switch (action.proximity) {
        case PROXIMITIES.IMMEDIATE:
          detectedProximity = 3;
          break;
        case PROXIMITIES.NEAR:
          detectedProximity = 2;
          break;
        case PROXIMITIES.FAR:
          detectedProximity = 1;
          break;
        case PROXIMITIES.UNKNOWN:
          detectedProximity = state.proximity;
          break;
        default:
          detectedProximity = 0;
      }

      if (Beacons[action.beaconID] !== undefined) {
        return Object.assign({}, state, Beacons[action.beaconID], {'proximity' : detectedProximity});
      } else {
        return Object.assign({}, state, Beacons.None);
      }

    default:
      return state;
  };
}

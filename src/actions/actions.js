/*
 * action types
 */

export const SWITCH_CONTEXT = 'SWITCH_CONTEXT'

/*
 * other constants
 */

export const PROXIMITIES = {
  IMMEDIATE: 'IMMEDIATE',
  NEAR: 'NEAR',
  FAR: 'FAR',
  UNKNOWN: 'UNKNOWN',
}

/*
 * action creators
 */

export function switchContext(beaconID, proximity) {
  return { type: SWITCH_CONTEXT, beaconID: beaconID,  proximity: proximity}
}

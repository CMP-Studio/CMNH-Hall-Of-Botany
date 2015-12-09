/*
 * action types
 */

export const CHANGE_ACTIVE_BEACON = 'CHANGE_ACTIVE_BEACON'
export const SWITCH_AUDIO = 'SWITCH_AUDIO'

/*
 * action creators
 */

export function changeActiveBeacon(beacon, proximity) {
  return { type: CHANGE_ACTIVE_BEACON, beacon: beacon,  proximity: proximity}
}

export function switchAudio(audioSrc, state, volume) {
  return { type: SWITCH_AUDIO, audioSrc: audioSrc,  state: state, volume: volume}
}

/*
 * action types
 */

export const SWITCH_CONTEXT = 'SWITCH_CONTEXT'
export const SWITCH_AUDIO = 'SWITCH_AUDIO'

/*
 * action creators
 */

export function switchContext(beaconInfo, proximity) {
  return { type: SWITCH_CONTEXT, beaconInfo: beaconInfo,  proximity: proximity}
}

export function switchAudio(audioSrc, state, volume) {
  return { type: SWITCH_AUDIO, audioSrc: audioSrc,  state: state, volume: volume}
}

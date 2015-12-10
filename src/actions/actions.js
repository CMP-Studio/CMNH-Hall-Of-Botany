
const React = require('react-native');
const AudioManager = React.NativeModules.AudioManager;

/*
 * action types
 */

export const CHANGE_ACTIVE_BEACON = 'CHANGE_ACTIVE_BEACON'
export const LOAD_AUDIO = 'LOAD_AUDIO '
export const ADJUST_AUDIO_VOLUME = 'ADJUST_AUDIO_VOLUME'
export const STOP_AUDIO = 'STOP_AUDIO '

/*
 * other constants
 */

export const AudioStates = {
  PLAYING: 'PLAYING',
  STOPPED: 'STOPPED',
}

/*
 * action creators
 */

export function changeActiveBeacon(beacon, proximity) {
  return { type: CHANGE_ACTIVE_BEACON, beacon: beacon,  proximity: proximity}
}

export function loadAudio(audioSrc) {
  AudioManager.loadAudio(audioSrc);
  return { type: LOAD_AUDIO, audioSrc: audioSrc, state: AudioStates.PLAYING}
}

export function adjustAudioVolume(volume) {
  AudioManager.adjustVolume(volume);
  return { type: ADJUST_AUDIO_VOLUME, volume: volume}
}

export function stopAudio() {
  AudioManager.stopAudio();
  return { type: STOP_AUDIO, state: AudioStates.STOPPED}
}

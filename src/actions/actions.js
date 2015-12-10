
const React = require('react-native');
const AudioManager = React.NativeModules.AudioManager;

/*
 * action types
 */

export const CHANGE_ACTIVE_BEACON = 'CHANGE_ACTIVE_BEACON'

export const LOAD_AUDIO = 'LOAD_AUDIO'
export const STOP_AUDIO = 'STOP_AUDIO'
export const PLAY_AUDIO = 'PLAY_AUDIO'
export const PAUSE_AUDIO = 'PAUSE_AUDIO'
export const ADJUST_AUDIO_VOLUME = 'ADJUST_AUDIO_VOLUME'

/*
 * other constants
 */

export const AudioStates = {
  PLAYING: 'PLAYING',
  STOPPED: 'STOPPED',
  PAUSED: 'PAUSED'
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

export function pauseAudio() {
  AudioManager.pauseAudio();
  return { type: PAUSE_AUDIO, state: AudioStates.PAUSED}
}

export function playAudio() {
  AudioManager.playAudio();
  return { type: PLAY_AUDIO, state: AudioStates.PLAYING}
}


const React = require('react-native');
const AudioManager = React.NativeModules.AudioManager;

/*
 * action types
 */

// Beacon Actions
export const CHANGE_ACTIVE_BEACON = 'CHANGE_ACTIVE_BEACON';
export const UPDATE_ACTIVE_BEACON = 'UPDATE_ACTIVE_BEACON';
export const CLEAR_ACTIVE_BEACON = 'CLEAR_ACTIVE_BEACON';

// Audio Actions
export const LOAD_AUDIO = 'LOAD_AUDIO';
export const STOP_AUDIO = 'STOP_AUDIO';
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';
export const TOGGLE_PLAY_AUDIO = 'TOGGLE_PLAY_AUDIO';
export const ADJUST_AUDIO_VOLUME = 'ADJUST_AUDIO_VOLUME';

/*
 * other constants
 */

export const Zones = {
  NEAR: 'NEAR',
  FAR: 'FAR',
  UNKNOWN: 'UNKNOWN',
};

export const AudioStates = {
  PLAYING: 'PLAYING',
  STOPPED: 'STOPPED',
  PAUSED: 'PAUSED',
};

/*
 * action creators
 */

export function changeActiveBeacon(beacon, rssi) {
  return { type: CHANGE_ACTIVE_BEACON, beacon, rssi };
}

export function updateActiveBeacon(rssi) {
  return { type: UPDATE_ACTIVE_BEACON, rssi };
}

export function clearActiveBeacon() {
  return { type: CLEAR_ACTIVE_BEACON };
}

export function loadAudio(audioSrc) {
  AudioManager.loadAudio(audioSrc);
  return { type: LOAD_AUDIO, audioSrc, audioState: AudioStates.PLAYING };
}

export function adjustAudioVolume(volume) {
  AudioManager.adjustVolume(volume);
  return { type: ADJUST_AUDIO_VOLUME, volume };
}

export function stopAudio() {
  AudioManager.stopAudio();
  return { type: STOP_AUDIO, audioState: AudioStates.STOPPED };
}

export function pauseAudio() {
  AudioManager.pauseAudio();
  return { type: PAUSE_AUDIO, audioState: AudioStates.PAUSED };
}

export function playAudio() {
  AudioManager.playAudio();
  return { type: PLAY_AUDIO, audioState: AudioStates.PLAYING };
}

export function togglePlayAudio() {
  AudioManager.togglePlayAudio();
  return { type: TOGGLE_PLAY_AUDIO };
}

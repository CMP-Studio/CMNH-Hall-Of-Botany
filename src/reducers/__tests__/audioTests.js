
/* eslint-env jest */

// __tests__/audioTests.js

// Mock the AudioManager react native Native Module
const emptyFunction = () => {};

const AudioManager = {
  adjustVolume: emptyFunction,
  loadAudio: emptyFunction,
  toggleMuteAudio: emptyFunction,
  unmuteAudio: emptyFunction,
  muteAudio: emptyFunction,
  togglePlayAudio: emptyFunction,
  playAudio: emptyFunction,
  pauseAudio: emptyFunction,
  stopAudio: emptyFunction,
};

jest.setMock('react-native', { NativeModules: { AudioManager } });

jest.dontMock('../audio');
const reducer = require('../audio');

describe('audio reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        audioSrc: '',
        audioState: 'STOPPED',
        volume: 0.0,
        muted: false,
      }
    );
  });
});


'use strict';

import { Zones } from '../actions/actions';
import WalkAroundView from './walkAroundView';
import BeaconView from './beaconView';

const React = require('react-native');
const BeaconManager = React.NativeModules.BeaconManager;
const AudioManager = React.NativeModules.AudioManager;

const proximityUUID = '3E75CE42-FCB1-C4CF-2A09-7595CD914F96';
const beaconRegionID = 'Hall Of Botany';

const Beacons = {
  '41892:30560': {
    title: 'Mt. Rainer',
    text: 'The sound of rushing water',
    audioSrc: 'WaterSoundsLoop.mp3',
    imgSrc: 'MtRainer.jpg',
  },
  '54445:31148': {
    title: 'Pennsylvania Forests',
    text: 'Lovley bird noises',
    audioSrc: 'BirdSoundsLoop.mp3',
    imgSrc: 'PennForrests.jpg',
  },
  None: {
    title: '',
    text: '',
    audioSrc: '',
    imgSrc: '',
  },
};

const {
  StyleSheet,
  Image,
  View,
  Text,
  PropTypes,
  NativeAppEventEmitter,
} = React;

class HallOfBotanyView extends React.Component {
  static get propTypes() {
    return {
      activeBeacon: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
      }).isRequired,
    };
  }

  componentDidMount() {
    const notificationText = 'Do you hear that? Something is playing faintly in the background, you should open the Hall Of Botany app and hear it yourself.';
    BeaconManager.startTracking(proximityUUID, beaconRegionID, notificationText);
    NativeAppEventEmitter.addListener('BeaconManagerBeaconPing', (body) => this.beaconNotificationPing(body));

    AudioManager.prepareForBackgroundAudio();
  }

  beaconNotificationPing(body) {
    const { loadAudio, adjustAudioVolume, stopAudio, changeActiveBeacon, clearActiveBeacon, updateActiveBeacon, activeBeacon } = this.props;

    let detectedBeacon;
    const beaconID = body.major + ':' + body.minor;

    if (Beacons[beaconID] !== undefined) {
      detectedBeacon = Beacons[beaconID];
    } else {
      detectedBeacon = Beacons.None;
    }

    // State transitions
    // None -> Beacon = loadAudio
    // Beacon -> Same Beacon = adjustAudioVolume
    // Beacon -> Different Beacon = loadAudio
    // Beacon -> None = stopAudio
    if ((activeBeacon.title === Beacons.None.title) &&
        (detectedBeacon.title !== Beacons.None.title)) {
      loadAudio(detectedBeacon.audioSrc);
      changeActiveBeacon(detectedBeacon, body.rssi);

    } else if (activeBeacon.title !== Beacons.None.title) {

      if (activeBeacon.title === detectedBeacon.title) {
        let soundVolume = 0.0;

        if (activeBeacon.zone === Zones.NEAR) {
          soundVolume = 1.0;
        } else if (activeBeacon.zone === Zones.FAR) {
          soundVolume = 0.5;
        }

        // Update volume with last beacon proximity
        adjustAudioVolume(soundVolume);
        updateActiveBeacon(body.rssi);

      } else if (detectedBeacon.title === Beacons.None.title) {
        stopAudio();
        clearActiveBeacon();

      } else if (activeBeacon.title !== detectedBeacon.title) {
        loadAudio(detectedBeacon.audioSrc);
        changeActiveBeacon(detectedBeacon, body.rssi);
      }
    }
  }

  componentWillUnmount() {
    const { stopAudio, clearActiveBeacon } = this.props;

    stopAudio();
    clearActiveBeacon();
    eaconManager.stopTracking();
  }

  render() {
    const { activeBeacon } = this.props;
    const debug = true;
    let body;

    if (activeBeacon.zone === Zones.UNKNOWN) {
      body = (<WalkAroundView/>);

    } else {
      let imageOpacity = 0.0;

      if (activeBeacon.zone === Zones.NEAR) {
        imageOpacity = 1.0;
      } else if (activeBeacon.zone === Zones.FAR) {
        imageOpacity = 0.5;
      }

      body = (<BeaconView beacon={activeBeacon} imageOpacity={imageOpacity}/>);
    }

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.toolbar}>
            <Text style={[styles.toolbarTitle, {paddingTop: 10}]}>
              Hall Of Botany
            </Text>
          </View>
          <View style={styles.separator} />
        </View>

        <View style={styles.body}>
          {body}
        </View>

        <View style={{opacity: debug}}>
          <View style={styles.separator} />
          <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>
              Zone: {activeBeacon.zone}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
  },
  toolbar: {
    height: 64,
    backgroundColor: '#F5FCFF',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  toolbarTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  body: {
    flex: 2,
  },
});

module.exports = HallOfBotanyView;

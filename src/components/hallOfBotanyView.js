
import { Zones } from '../actions/actions';
import WalkAroundView from './walkAroundView';
import BeaconView from './beaconView';
import NowPlayingToolbar from './nowPlayingToolbar';

const React = require('react-native');
const BeaconManager = React.NativeModules.BeaconManager;
const AudioManager = React.NativeModules.AudioManager;

const PROXIMITY_UUID = '3E75CE42-FCB1-C4CF-2A09-7595CD914F96';
const BEACON_REGION_ID = 'Hall Of Botany';

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
  View,
  Text,
  PropTypes,
  NativeAppEventEmitter,
} = React;

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

class HallOfBotanyView extends React.Component {
  static get propTypes() {
    return {
      activeBeacon: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        zone: PropTypes.string.isRequired,
      }).isRequired,
      audio: PropTypes.shape({
        audioSrc: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        volume: PropTypes.number.isRequired,
      }).isRequired,
      loadAudio: PropTypes.func.isRequired,
      stopAudio: PropTypes.func.isRequired,
      togglePlayAudio: PropTypes.func.isRequired,
      adjustAudioVolume: PropTypes.func.isRequired,
      clearActiveBeacon: PropTypes.func.isRequired,
      updateActiveBeacon: PropTypes.func.isRequired,
      changeActiveBeacon: PropTypes.func.isRequired,
    };
  }

  componentDidMount() {
    const notificationText = 'Do you hear that? Something is playing faintly in the background, you should open the Hall Of Botany app and hear it yourself.';
    BeaconManager.startTracking(PROXIMITY_UUID, BEACON_REGION_ID, notificationText);
    NativeAppEventEmitter.addListener('BeaconManagerBeaconPing', (body) => this.beaconNotificationPing(body));

    AudioManager.prepareForBackgroundAudio();
  }

  componentWillUnmount() {
    const { stopAudio, clearActiveBeacon } = this.props;

    stopAudio();
    clearActiveBeacon();
    BeaconManager.stopTracking();
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

        // Update volume with last beacon proximity:
        // Due to fading and how quickly the beacons ping it will quickly
        // adjust to new proximities
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

  render() {
    const { activeBeacon, audio, togglePlayAudio } = this.props;
    const debug = false;
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
            <Text style={[styles.toolbarTitle, { paddingTop: 10 }]}>
              Hall Of Botany
            </Text>
          </View>
          <View style={styles.separator} />
        </View>

        <View style={styles.body}>
          {body}
        </View>

        <View style={{ opacity: debug }}>
          <View style={styles.separator} />
          <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>
              Zone: {activeBeacon.zone}
            </Text>
          </View>
        </View>

        <NowPlayingToolbar audio={audio} togglePlayAudio={togglePlayAudio}/>
      </View>
    );
  }
}

module.exports = HallOfBotanyView;

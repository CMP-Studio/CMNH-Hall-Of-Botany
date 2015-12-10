
'use strict';

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
    proximity: 1
  },
  '54445:31148': {
    title: 'Pennsylvania Forests', 
    text: 'Lovley bird noises',
    audioSrc: 'BirdSoundsLoop.mp3',
    proximity: 1
  },
  'None': {
    title: '', 
    text: '',
    audioSrc: '',
    proximity: 0
  },
};

const PROXIMITIES = {
  IMMEDIATE: 'IMMEDIATE',
  NEAR: 'NEAR',
  FAR: 'FAR',
  UNKNOWN: 'UNKNOWN',
};

const {
  StyleSheet,
  ListView,
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
        proximity: PropTypes.number.isRequired,
      }).isRequired,
      loadAudio: PropTypes.func.isRequired,
      stopAudio: PropTypes.func.isRequired,
      adjustAudioVolume: PropTypes.func.isRequired,
      changeActiveBeacon: PropTypes.func.isRequired,
    };
  }

  componentDidMount() {
    const notificationText = "Do you hear that? Something is playing faintly in the background, you should open the Hall Of Botany app and hear it yourself.";
    BeaconManager.startTracking(proximityUUID, beaconRegionID, notificationText);
    NativeAppEventEmitter.addListener("BeaconManagerBeaconPing", (body) => this.beaconNotificationPing(body));

    AudioManager.prepareForBackgroundAudio();
  }

  beaconNotificationPing(body) {
    const { loadAudio, adjustAudioVolume, stopAudio, changeActiveBeacon, activeBeacon } = this.props;

    let detectedBeacon;
    let proximity = 1;
    const beaconID = body.major + ':' + body.minor;

    switch (body.proximity) {
      case PROXIMITIES.IMMEDIATE:
      case PROXIMITIES.NEAR:
        proximity = 2;
        break;
      case PROXIMITIES.FAR:
        proximity = 1;
        break;
      case PROXIMITIES.UNKNOWN:
        // Keep old proximity
        proximity = activeBeacon.proximity;
        break;
      default:
        proximity = 1;
    }

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

    } else if (activeBeacon.title !== Beacons.None.title) {

      if (activeBeacon.title === detectedBeacon.title) {
        adjustAudioVolume(proximity);

      } else if (detectedBeacon.title === Beacons.None.title) {
        stopAudio();

      } else if (activeBeacon.title !== detectedBeacon.title) {
        loadAudio(detectedBeacon.audioSrc);
      }
    }

    changeActiveBeacon(detectedBeacon, proximity);
  }

  componentWillUnmount() {
    const { switchAudio } = this.props;

    BeaconManager.stopTracking();
    switchAudio('', 'stop', 0.0);
  }

  render() {
    var { activeBeacon } = this.props;

    var activeImage;
    var title = activeBeacon.title;

    if (title === 'Mt. Rainer') {
      activeImage = require('../img/MtRainer.jpg');
    } else if (title === 'Pennsylvania Forests') {
      activeImage = require('../img/PennForrests.jpg');
    } else {
      title = "Please walk around to \nexperience this exhibit";
    }

    return (
      <View style={{backgroundColor: 'lightGray'}}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Hall Of Botany
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.container}>
          <Image style={{height: 250, resizeMode: 'contain', opacity: (0.5 * activeBeacon.proximity)}} source={activeImage} />
        </View>

        <View style={styles.container, {height: 253}}>
          <View>
            <Text style={styles.title}>
              {title}
            </Text>
          </View>

          <View style={{flex: 2}}>
            <Text style={styles.text}>
              {activeBeacon.text}
            </Text>
          </View>

        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  title: {
    margin: 10,
    fontSize: 18,
  },
  text: {
    fontSize: 14,
    margin: 5,
  },
  headerTitle: {
    paddingTop: 10,
    fontSize: 20,
  },
});

module.exports = HallOfBotanyView;

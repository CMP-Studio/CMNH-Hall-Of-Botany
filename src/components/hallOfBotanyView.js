
'use strict';

import { Zones } from '../reducers/activeBeacon';

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
  'None': {
    title: '', 
    text: '',
    audioSrc: '',
    imgSrc: '',
  },
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
      }).isRequired,
    };
  }

  componentDidMount() {
    const notificationText = "Do you hear that? Something is playing faintly in the background, you should open the Hall Of Botany app and hear it yourself.";
    BeaconManager.startTracking(proximityUUID, beaconRegionID, notificationText);
    NativeAppEventEmitter.addListener("BeaconManagerBeaconPing", (body) => this.beaconNotificationPing(body));

    AudioManager.prepareForBackgroundAudio();
  }

  beaconNotificationPing(body) {
    const { loadAudio, adjustAudioVolume, stopAudio, changeActiveBeacon, noActiveBeacon, updateActiveBeacon, activeBeacon } = this.props;

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
        adjustAudioVolume(1.0);
        updateActiveBeacon(body.rssi);

      } else if (detectedBeacon.title === Beacons.None.title) {
        stopAudio();
        noActiveBeacon();

      } else if (activeBeacon.title !== detectedBeacon.title) {
        loadAudio(detectedBeacon.audioSrc);
        changeActiveBeacon(detectedBeacon, body.rssi);
      }
    }
  }

  componentWillUnmount() {
    const { stopAudio, noActiveBeacon } = this.props;

    BeaconManager.stopTracking();

    stopAudio();
    noActiveBeacon();
  }

  loadBeaconImage(imgName) {
    // Require parameters must be static
    if (imgName === 'MtRainer.jpg') {
      return require('../img/MtRainer.jpg');
    } else if (imgName === 'PennForrests.jpg') {
      return require('../img/PennForrests.jpg');
    }
  }

  render() {
    var { activeBeacon } = this.props;

    var imageOpacity = 0;
    var title = activeBeacon.title;

    if (title === Beacons.None.title) {
      title = "Please walk around to \nexperience this exhibit";
    }

    if (activeBeacon.zone === Zones.NEAR) {
      imageOpacity = 1.0;
    } else if (activeBeacon.zone === Zones.FAR) {
      imageOpacity = 0.5;
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
          <Image style={{height: 250, resizeMode: 'contain', opacity: imageOpacity}} 
                 source={this.loadBeaconImage(activeBeacon.imgSrc)} />
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
             <Text style={styles.text}>
              {activeBeacon.zone}
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

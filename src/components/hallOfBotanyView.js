
'use strict';

const React = require('react-native');
const BeaconManager = React.NativeModules.BeaconManager;

const proximityUUID = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
const beaconRegionID = 'Hall Of Botany';

const Beacons = {
  '41892:30560': {
    title: 'Mt. Rainer', 
    text: 'The sound of rushing water',
    audioSrc: 'WaterSoundsLoop.mp3',
    proximity: 0},
  '54445:31148': {
    title: 'Pennsylvania Forests', 
    text: 'Lovley bird noises',
    audioSrc: 'BirdSoundsLoop.mp3',
    proximity: 0
  },
  'None': {
    title: '', 
    text: '',
    audioSrc: '',
    proximity: 0},
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
      context: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        proximity: PropTypes.number.isRequired,
      }).isRequired,
      switchAudio: PropTypes.func.isRequired,
      switchContext: PropTypes.func.isRequired,
      addBeaconHistory: PropTypes.func.isRequired,
    };
  }

  componentDidMount() {
    const { switchAudio, switchContext, addBeaconHistory, context } = this.props;

    BeaconManager.startTracking(proximityUUID, beaconRegionID);

    NativeAppEventEmitter.addListener("BeaconManagerBeaconPing", ( body ) => {
      let detectedBeacon;
      let proximity = 0;
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
          proximity = context.proximity;
          break;
        default:
          proximity = 0;
      }

      if (Beacons[beaconID] !== undefined) {
        detectedBeacon = Beacons[beaconID];
      } else {
        detectedBeacon = Beacons.None;
      }

      switchAudio(detectedBeacon.audioSrc, 'play', proximity * 0.5);
      addBeaconHistory(detectedBeacon.title);
      switchContext(detectedBeacon, proximity);
    });
  }

  componentWillUnmount() {
    const { switchAudio } = this.props;

    BeaconManager.stopTracking();
    switchAudio('', 'stop', 0.0);
  }

  render() {
    var { context, beaconHistory } = this.props;

    var mtRainerIcon, PennForestsIcon;
    var far = false;
    var close = false;

    if (context.proximity == 1) {
      far = true;
    } else if (context.proximity == 2) {
      close = true;
    }

    // TODO: Should an already discovered state exist?
    mtRainerIcon = require('../img/Active.png');

    if (context.title == 'Mt. Rainer') {
      if (far) {
        mtRainerIcon = require('../img/Far.png');
      } else if (close) {
        mtRainerIcon = require('../img/Close.png');
      }

    } else if (beaconHistory.indexOf('Mt. Rainer') > -1) {
      mtRainerIcon = require('../img/Visited.png');
    }

    PennForestsIcon = require('../img/Active.png');

    if (context.title == 'Pennsylvania Forests') {
      if (far) {
        PennForestsIcon = require('../img/Far.png');
      } else if (close) {
        PennForestsIcon = require('../img/Close.png');
      }

    } else if (beaconHistory.indexOf('Pennsylvania Forests') > -1) {
      PennForestsIcon = require('../img/Visited.png');
    }

    return (
      <View>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Hall Of Botany
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.container}>

          <View style={styles.circlesContainer}>
            <View style={styles.roomOutline}>
              <View style={{height: 100}}>
                <Image style={{alignSelf: 'center'}} source={mtRainerIcon} />
              </View>

              <View style={{marginTop: 40, height: 100}}>
                <Image style={{alignSelf: 'center'}} source={PennForestsIcon} />
              </View>
            </View>
          </View>

          </View>
            <Text style={styles.title}>
              {context.title}
            </Text>
          <View>

          </View>
            <Text style={styles.text}>
              {context.text}
            </Text>
          <View>
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
    flex: 1,
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
  circlesContainer: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightGray',
  },
  roomOutline: {
    width: 200,
    height: 250,
    borderWidth: 5,
    borderColor: 'darkGray'
  },
});

module.exports = HallOfBotanyView;

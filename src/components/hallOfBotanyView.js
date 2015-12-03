
'use strict';

const React = require('react-native');
const BeaconManager = React.NativeModules.BeaconManager;

const proximityUUID = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
const beaconRegionID = 'Hall Of Botany';

const {
  StyleSheet,
  ListView,
  View,
  Text,
  PropTypes,
  NativeAppEventEmitter,
} = React;

var HallOfBotanyView = React.createClass({
  propTypes: {
    context: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      proximity: PropTypes.number.isRequired,
    }).isRequired,
    switchContext: PropTypes.func.isRequired,
  },

  componentDidMount: function() {
    var { switchContext } = this.props;

    BeaconManager.startTracking(proximityUUID, beaconRegionID);

    NativeAppEventEmitter.addListener("BeaconManagerBeaconPing", ( body ) => {
      switchContext(body.major + ':' + body.minor, body.proximity);
    });
  },

  componentWillUnmount: function() {
    BeaconManager.stopTracking();
  },

  render: function() {
    var { context } = this.props;

    var far = false;
    var middle = false;
    var inner = false;

    if (context.proximity >= 1) {
      far = true;
      if (context.proximity >= 2) {
        middle = true;
        if (context.proximity >= 3) {
          inner = true;
        }
      }
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
            <View style={far && styles.farCircle}>
              <View style={middle && styles.middleCircle}>
                <View style={inner && styles.closeCircle}>
                </View>
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
  },
});

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
    backgroundColor: 'blue',
  },
  farCircle: {
    height: 225,
    width: 225,
    borderRadius: 112.5,
    backgroundColor: 'yellow',
  },
  middleCircle: {
    height: 150,
    width: 150,
    margin: 37.5,
    borderRadius: 75,
    backgroundColor: 'orange',
  },
  closeCircle: {
    height: 75,
    width: 75,
    margin: 37.5,
    borderRadius: 37.5,
    backgroundColor: 'red',
  },
});

module.exports = HallOfBotanyView;

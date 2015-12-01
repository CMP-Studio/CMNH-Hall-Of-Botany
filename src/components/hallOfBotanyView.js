
'use strict';

const React = require('react-native');

const {
  StyleSheet,
  ListView,
  View,
  Text,
  PropTypes,
} = React;

var HallOfBotanyView = React.createClass({
  propTypes: {
    context: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  },

  render: function() {
    var { context } = this.props;

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
            <View style={true && styles.farCircle}>
              <View style={true && styles.middleCircle}>
                <View style={true && styles.closeCircle}>
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
  }
});

module.exports = HallOfBotanyView;

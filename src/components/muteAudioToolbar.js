
const React = require('react-native');

const {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  PropTypes,
} = React;

const styles = StyleSheet.create({
  image: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  toolbar: {
    height: 64,
    backgroundColor: '#F5FCFF',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

class MuteAudioToolbar extends React.Component {
  static get propTypes() {
    return {
      muted: PropTypes.bool.isRequired,
      toggleMuteAudio: PropTypes.func.isRequired,
    };
  }

  loadMuteStateImage(muted) {
    // Require parameters must be static
    if (muted) {
      return require('../img/Muted.png');
    }

    return require('../img/Unmuted.png');
  }

  render() {
    const { muted, toggleMuteAudio } = this.props;

    return (
      <View>
        <View style={styles.separator} />
        <TouchableHighlight onPress={toggleMuteAudio}>
          <View style={styles.toolbar}>
            <Image style={styles.image} source={this.loadMuteStateImage(muted)}/>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = MuteAudioToolbar;


import { AudioStates } from '../actions/actions';

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

class NowPlayingToolbar extends React.Component {
  static get propTypes() {
    return {
      audio: PropTypes.shape({
        audioSrc: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        volume: PropTypes.number.isRequired,
      }).isRequired,
      togglePlayAudio: PropTypes.func.isRequired,
    };
  }

  loadAudioStateImage(audioState) {
    // Require parameters must be static
    if (audioState === AudioStates.PLAYING) {
      return require('../img/Pause.png');
    } else if (audioState === AudioStates.PAUSED) {
      return require('../img/Play.png');
    }
  }

  render() {
    const { audio, togglePlayAudio } = this.props;

    return (
      <View>
        <View style={styles.separator} />
        <TouchableHighlight onPress={togglePlayAudio}>
          <View style={styles.toolbar}>
            <Image style={styles.image} source={this.loadAudioStateImage(audio.audioState)}/>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = NowPlayingToolbar;

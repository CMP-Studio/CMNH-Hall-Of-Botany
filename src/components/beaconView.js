
const React = require('react-native');

const {
  StyleSheet,
  Image,
  View,
  Text,
  PropTypes,
} = React;

class BeaconView extends React.Component {
  static get propTypes() {
    return {
      activeBeacon: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
      }).isRequired,
      imageOpacity: PropTypes.number.isRequired,
    };
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
    let { beacon, imageOpacity } = this.props;

    return (
      <View>
        <Image style={[styles.image, {opacity: imageOpacity}]}
               source={this.loadBeaconImage(beacon.imgSrc)} />

        <Text style={styles.title}>
          {beacon.title}
        </Text>
        <Text style={styles.text}>
          {beacon.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    margin: 20,
    fontSize: 18,
  },
  text: {
    fontSize: 14,
    margin: 10,
  },
});

module.exports = BeaconView;

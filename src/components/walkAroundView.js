
const React = require('react-native');

const {
  StyleSheet,
  Image,
  View,
  Text,
} = React;

class WalkAroundView extends React.Component {
  render() {
    const message = 'Please walk around to \nexperience this exhibit';

    return (
      <View>
        <Image style={styles.image}
               source={require('../img/FootSteps.png')} />

        <Text style={styles.title}>
          {message}
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
});

module.exports = WalkAroundView;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/containers/app';
import configureStore from './src/store/configureStore';

const store = configureStore();

class HallOfBotany extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Hall_Of_Botany', () => HallOfBotany);

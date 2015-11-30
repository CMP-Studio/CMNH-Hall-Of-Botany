/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component, AppRegistry } from 'react-native';
import { Provider } from 'react-redux/native';
import App from './src/containers/app';
import configureStore from './src/store/configureStore';

const store = configureStore();

class Hall_Of_Botany extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Hall_Of_Botany', () => Hall_Of_Botany);

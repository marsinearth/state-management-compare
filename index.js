/**
 * @format
 */

import App from './src/App';
import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
AppRegistry.registerComponent(appName, () => App);

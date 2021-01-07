/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store } from '@src/store';
import { Provider } from 'react-redux';
import React from 'react';

const Root = (props) => (
    <Provider store={store}>

        <App {...props} />

    </Provider>
);

AppRegistry.registerComponent(appName, () => Root);

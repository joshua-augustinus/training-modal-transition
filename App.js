/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { AppContainer } from '@src/AppContainer';
import { OverlayScreen } from '@src/screens/OverlayScreen';

const App = () => {
    return (
        <Fragment>
            <AppContainer />
            <OverlayScreen />
        </Fragment>
    );
};



export default App;

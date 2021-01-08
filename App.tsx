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
import { RootState } from '@src/types';
import { useSelector } from 'react-redux'

const App = () => {
    const smallPressInfo = useSelector((state: RootState) => state.smallPressInfo);
    const mediumPressInfo = useSelector((state: RootState) => state.mediumPressInfo);

    return (
        <Fragment>
            <AppContainer />
            <OverlayScreen pressInfo={smallPressInfo} />
            <OverlayScreen pressInfo={mediumPressInfo} />

        </Fragment>
    );
};



export default App;

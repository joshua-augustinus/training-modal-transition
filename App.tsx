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
import { RootState } from '@src/types';
import { useSelector } from 'react-redux'
import { SmallTransition } from '@src/screens/Overlays/SmallTransition';
import { MediumTransition } from '@src/screens/Overlays/MediumTransition';

const App = () => {
    const smallPressInfo = useSelector((state: RootState) => state.smallPressInfo);
    const mediumPressInfo = useSelector((state: RootState) => state.mediumPressInfo);

    return (
        <Fragment>
            <AppContainer />
            <SmallTransition pressInfo={smallPressInfo} />
            <MediumTransition pressInfo={mediumPressInfo} />

        </Fragment>
    );
};



export default App;

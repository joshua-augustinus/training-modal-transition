import React, { useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, useWindowDimensions, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { FeatureButton } from '@src/components/FeatureButton';
import { RootState } from '@src/types';
import { useSelector } from 'react-redux'
/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
}

const OverlayScreen = (props: Props) => {
    const pressInfo = useSelector((state: RootState) => state.pressInfo);
    const screenWidth = useWindowDimensions().width;

    useEffect(() => {

    }, []);

    const transform = [{
        translateX: pressInfo ? 0 : screenWidth
    }]


    return (
        <SafeAreaView style={{ ...styles.overlayContainer, transform: transform }}>
            <View style={{ height: 50, opacity: 0 }}>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'green' }}>
                <FeatureButton navigation={null} />
            </View>
        </SafeAreaView>

    );

}


export { OverlayScreen }

const styles = StyleSheet.create({
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: -1//ScrollView of activity will not work otherwis    },

    }
});


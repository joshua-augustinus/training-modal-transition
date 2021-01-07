import React, { useEffect, useRef } from 'react';
import { Animated as Spring, View, BackHandler, useWindowDimensions, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { FeatureButton } from '@src/components/FeatureButton';
import { RootState } from '@src/types';
import { useSelector } from 'react-redux'
import { getSpringConfig } from '@src/constants/SpringConfig';
/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
}

const OverlayScreen = (props: Props) => {
    const pressInfo = useSelector((state: RootState) => state.pressInfo);
    const screenWidth = useWindowDimensions().width;
    const springState = useRef(new Spring.Value(0)).current;
    useEffect(() => {
        if (pressInfo) {
            Spring.spring(springState, getSpringConfig(1)).start();
        } else {
            Spring.spring(springState, getSpringConfig(0)).start();

        }
    }, [pressInfo]);

    const transform = [{
        translateX: pressInfo ? 0 : screenWidth
    }]

    const imageTransform = [{
        translateY: springState.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 400]
        })
    }]

    return (
        <SafeAreaView style={{ ...styles.overlayContainer, transform: transform }}>
            <View style={{ height: 50, opacity: 0 }}>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'green' }}>
                <Spring.View style={{ transform: imageTransform }}>
                    <FeatureButton navigation={null} />

                </Spring.View>
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


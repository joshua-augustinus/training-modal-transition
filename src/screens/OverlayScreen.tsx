import React, { useEffect, useRef, useState } from 'react';
import { Animated as Spring, View, BackHandler, useWindowDimensions, StyleSheet, Image } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { FeatureButton } from '@src/components/FeatureButton';
import { RootState } from '@src/types';
import { useSelector } from 'react-redux'
import { getSpringConfig } from '@src/constants/SpringConfig';
import Animated from 'react-native-reanimated';
import { EasingFunctions } from '@src/constants/EasingFunctions';
/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
}
export const FEATURE_BUTTON_HEIGHT = 150;

const OverlayScreen = (props: Props) => {
    const pressInfo = useSelector((state: RootState) => state.pressInfo);
    const screenWidth = useWindowDimensions().width;
    const springState = useRef(new Spring.Value(0)).current;
    const layoutState = useRef(new Animated.Value(0)).current;
    const [transitionString, setTransitionString] = useState<string>('default');
    useEffect(() => {
        if (pressInfo) {
            setTransitionString('forward')


        }
    }, [pressInfo]);

    useEffect(() => {
        if (transitionString === 'forward') {
            Spring.spring(springState, getSpringConfig(1)).start(() => {
                setTransitionString('finished')

            });
            Animated.timing(layoutState, {
                toValue: 1,
                easing: EasingFunctions.easeInOut,
                duration: 400
            }).start();
        }
    }, [transitionString]);




    //Adding this line causes blink:
    if (!pressInfo) {
        return null;

    }

    const imageTransform = [{
        translateY: springState.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 400]
        })
    },
    {
        scale: springState.interpolate({
            inputRange: [0, 1],
            outputRange: [0.90, 1]
        })
    }]

    const height = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [FEATURE_BUTTON_HEIGHT, FEATURE_BUTTON_HEIGHT + 100]
    })


    const width = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [screenWidth / 2, screenWidth]
    })

    const opacity = transitionString === 'forward' ? 1 : 0


    return (
        <SafeAreaView style={{ ...styles.overlayContainer }}>
            <View style={{ height: 50, opacity: 0 }}>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', opacity: opacity }}>
                <Spring.View style={{ transform: imageTransform }}>
                    <Animated.Image style={{ ...styles.image, width: width, height: height }} resizeMode='cover' source={require('../assets/sample.jpg')} />



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

    },
    image: {
        width: '100%',

    }
});


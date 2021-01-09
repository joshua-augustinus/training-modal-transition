import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, useWindowDimensions, StyleSheet, Image, Text } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { PressInfo, RootState } from '@src/types';
import { useSelector, useDispatch } from 'react-redux'
import { getSpringConfig } from '@src/constants/SpringConfig';
import Animated from 'react-native-reanimated';
import { EasingFunctions } from '@src/constants/EasingFunctions';
import { layoutDimensions } from '@src/reducers/layoutDimensions';
/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    pressInfo: PressInfo
}
export const FEATURE_BUTTON_HEIGHT = 150;

const SmallTransition = (props: Props) => {
    const pressInfo = props.pressInfo;
    const screenWidth = useWindowDimensions().width;
    const layoutState = useRef(new Animated.Value(0)).current;
    const heightState = useRef(new Animated.Value(0)).current;

    const [transitionString, setTransitionString] = useState<string>('default');
    useEffect(() => {
        if (pressInfo) {
            setTimeout(() => {
                setTransitionString('forward')
            }, 100)





        } else {
            setTransitionString('default');
        }
    }, [pressInfo]);

    useEffect(() => {
        if (transitionString === 'forward') {

            Animated.timing(layoutState, {
                toValue: new Animated.Value(1),
                easing: EasingFunctions.easeInOutQuad,
                duration: 400
            }).start(() => {

                pressInfo.callback();
                setTransitionString('default')
            });
            /*Animated.timing(heightState, {
                toValue: new Animated.Value(1),
                easing: EasingFunctions.easeInOutQuad,
                duration: 600
            }).start(() => {
                pressInfo.callback();
                setTransitionString('default')

            });*/

        } else if (transitionString === 'default') {
            console.log("Back to default");

            Animated.timing(layoutState, {
                toValue: 0,
                easing: EasingFunctions.easeInOut,
                duration: 1
            }).start();

            Animated.timing(heightState, {
                toValue: 0,
                easing: EasingFunctions.easeInOut,
                duration: 1
            }).start(() => {

            });

        }
    }, [transitionString]);



    if (!pressInfo) {
        return null;

    }


    const containerTransform = [{
        translateY: layoutState.interpolate({
            inputRange: [0, 1],
            outputRange: [pressInfo.y - layoutDimensions.contentOffset, 0]
        })
    }, {
        translateX: layoutState.interpolate({
            inputRange: [0, 1],
            outputRange: [pressInfo.x, 0]
        })
    }

    ]
    const imageTransform = [{
        scale: layoutState.interpolate({
            inputRange: [0, 1],
            outputRange: [pressInfo.scale, 1]
        })
    }

    ]



    const height = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [pressInfo.height, FEATURE_BUTTON_HEIGHT + 100]
    })


    const width = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [pressInfo.width, screenWidth]
    })

    const borderRadius = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [pressInfo.borderRadius, 0]
    })

    const textTransform = [{
        scale:
            layoutState.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
            })
    }]

    //This is needed to get rid of flash
    const opacity = layoutState.interpolate({
        inputRange: [0, 0.1, 1],
        outputRange: [0, 1, 1]
    })

    const overlayTransform = [{ translateX: transitionString === 'forward' ? 0 : screenWidth }]


    return (
        <SafeAreaView style={{ ...styles.overlayContainer, transform: overlayTransform }}>
            <View style={{ height: 50, opacity: 0 }}>
            </View>
            <Animated.View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: 'white', opacity: 1 }}>
                <Animated.View style={{ transform: containerTransform, width: width, height: height, borderRadius: borderRadius, ...styles.imageContainer }}>
                    <Animated.Image style={{ ...styles.image, width: screenWidth, height: FEATURE_BUTTON_HEIGHT + 100, transform: imageTransform }} resizeMode='cover' source={pressInfo.imageSource} />



                </Animated.View>
            </Animated.View>
        </SafeAreaView>

    );

}


export { SmallTransition }

const styles = StyleSheet.create({
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: 1//ScrollView of activity will not work otherwis    },

    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    image: {

    },
    imageContainer: {
        overflow: 'hidden', alignItems: 'center', justifyContent: 'center'
    }
});


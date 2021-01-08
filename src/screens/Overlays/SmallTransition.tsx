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
                duration: 500
            }).start(() => {
                pressInfo.callback();
                setTransitionString('default')

            });
        } else if (transitionString === 'default') {
            console.log("Back to default");

            Animated.timing(layoutState, {
                toValue: 0,
                easing: EasingFunctions.easeInOut,
                duration: 1
            }).start();
        }
    }, [transitionString]);



    if (!pressInfo) {
        return null;

    }

    console.log("PressInof", pressInfo);

    const containerTransform = [{
        translateY: layoutState.interpolate({
            inputRange: [0, 1],
            outputRange: [pressInfo.y - layoutDimensions.contentOffset, 0]
        })
    },

    ]

    const imageTransform = [{
        translateX: layoutState.interpolate({
            inputRange: [0, 1],
            outputRange: [pressInfo.x, 0]
        })
    }

    ]


    const height = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [FEATURE_BUTTON_HEIGHT, FEATURE_BUTTON_HEIGHT + 100]
    })


    const width = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [pressInfo.width, screenWidth]
    })

    const borderRadius = layoutState.interpolate({
        inputRange: [0, 1],
        outputRange: [pressInfo.borderRadius, 0]
    })

    //This is needed to get rid of flash
    const opacity = transitionString === 'forward' ? 1 : 0
    const overlayTransform = [{ translateX: transitionString === 'forward' ? 0 : screenWidth }]


    return (
        <SafeAreaView style={{ ...styles.overlayContainer, transform: overlayTransform }}>
            <View style={{ height: 50, opacity: 0 }}>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: 'white', opacity: opacity }}>
                <Animated.View style={{ transform: containerTransform }}>
                    <Animated.View style={{ transform: imageTransform }}>
                        <Animated.Image style={{ ...styles.image, width: width, height: height, borderRadius: borderRadius }} resizeMode='cover' source={pressInfo.imageSource} />

                    </Animated.View>



                </Animated.View>
            </View>
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

    }
});


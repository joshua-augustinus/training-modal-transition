import { updatePressInfo } from "@src/reducers";
import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch } from 'react-redux';

interface Props {
    navigation: any,
    style?: any
}

export const FEATURE_BUTTON_HEIGHT = 150;

const FeatureButton = (props: Props) => {
    const width = useWindowDimensions().width;
    const cardRef = useRef(null);
    const dispatch = useDispatch();

    const onButtonPress = () => {
        console.log("Pressed");
        cardRef.current.measure((x, y, width, height, pageX, pageY) => {
            const layout = { x: pageX, y: pageY };
            dispatch(updatePressInfo(layout));
        });
    }

    const imageTransform = [{ scale: 1 }]



    return (


        <Pressable onPress={onButtonPress} >
            <View collapsable={false} style={{ ...props.style, justifyContent: 'center', alignItems: 'center', }}>
                <Image ref={cardRef} style={{ ...styles.image, width: width / 2 - 20, height: FEATURE_BUTTON_HEIGHT, transform: imageTransform }} resizeMode='cover' source={require('../assets/sample.jpg')} />

            </View>
        </Pressable>
    )
}

export { FeatureButton }

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        zIndex: 1
    },
    image: {
        width: '100%',

    }
})
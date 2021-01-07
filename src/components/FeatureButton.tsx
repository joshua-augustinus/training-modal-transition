import { updatePressInfo } from "@src/reducers";
import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch } from 'react-redux';

interface Props {
    navigation: any
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


    return (


        <Pressable onPress={onButtonPress}>
            <Image ref={cardRef} style={{ ...styles.image, width: width, height: FEATURE_BUTTON_HEIGHT }} resizeMode='cover' source={require('../assets/sample.jpg')} />
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
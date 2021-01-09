import { getEmptyNavigationOptions } from "@src/HeaderHelper";
import { updateMediumPressInfo, updateSmallPressInfo } from "@src/reducers";
import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch } from 'react-redux';

interface Props {
    navigation: any,
    style?: any
    halfSize: boolean,
    image: any
}

export const FEATURE_BUTTON_HEIGHT = 150;
const BORDER_RADIUS = 10;

const FeatureButton = (props: Props) => {
    const screenWidth = useWindowDimensions().width;
    const cardRef = useRef(null);
    const dispatch = useDispatch();

    const onButtonPress = () => {
        console.log("Pressed");
        cardRef.current.measure((x, y, width, height, pageX, pageY) => {
            const layout = {
                x: pageX, y: pageY, width: width, height: height, imageSource: props.image, borderRadius: BORDER_RADIUS, callback: () => {
                    props.navigation.navigate('SecondScreen')
                }
            };
            if (props.halfSize)
                dispatch(updateSmallPressInfo(layout));
            else {
                dispatch(updateMediumPressInfo(layout));
            }
            /*setTimeout(() => {
              

            }, 500)*/
        });
    }

    const imageTransform = [{ scale: props.halfSize ? 0.6 : 1 }]

    const gap = 10;
    const smallWidth = (screenWidth - (gap * 3)) / 2
    const mediumWidth = screenWidth - (gap * 2)

    const width = props.halfSize ? smallWidth : mediumWidth
    return (


        <Pressable onPress={onButtonPress} >
            <View collapsable={false} style={{ ...styles.container, ...props.style, }}>
                <View ref={cardRef} style={{ width: width, height: FEATURE_BUTTON_HEIGHT, borderRadius: BORDER_RADIUS, ...styles.imageContainer }}>
                    <Image style={{ ...styles.image, width: screenWidth, height: FEATURE_BUTTON_HEIGHT + 100, transform: imageTransform }} resizeMode='cover' source={props.image} />

                </View>
                <View style={styles.textContainer}><Text style={{ color: 'white' }}>Text Text Text Text Text Text</Text>
                </View>
            </View>
        </Pressable>
    )
}

export { FeatureButton }

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', alignItems: 'center',
        marginVertical: 5
    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    image: {
        borderRadius: BORDER_RADIUS,
    },
    imageContainer: {
        overflow: 'hidden', alignItems: 'center', justifyContent: 'center'
    }
})
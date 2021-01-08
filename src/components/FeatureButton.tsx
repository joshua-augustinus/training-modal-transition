import { updateMediumPressInfo, updateSmallPressInfo } from "@src/reducers";
import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch } from 'react-redux';

interface Props {
    navigation: any,
    style?: any
    halfSize: boolean
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
                x: pageX, y: pageY, width: width, height: height, imageSource: require('../assets/sample.jpg'), borderRadius: BORDER_RADIUS, callback: () => {
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

    const imageTransform = [{ scale: 1 }]


    const width = props.halfSize ? screenWidth / 2 - 20 : screenWidth - 30
    return (


        <Pressable onPress={onButtonPress} >
            <View collapsable={false} style={{ ...styles.container, ...props.style, }}>
                <Image ref={cardRef} style={{ ...styles.image, width: width, height: FEATURE_BUTTON_HEIGHT, transform: imageTransform }} resizeMode='cover' source={require('../assets/sample.jpg')} />
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
        borderRadius: BORDER_RADIUS
    }
})
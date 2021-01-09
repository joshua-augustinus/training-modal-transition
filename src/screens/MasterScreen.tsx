import React, { useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { FeatureButton } from '@src/components/FeatureButton';
import { layoutDimensions } from '@src/reducers/layoutDimensions';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const image1 = require('../assets/1124.jpg');
const image2 = require('../assets/990.jpg')

const MasterScreen = (props: Props) => {

    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        console.log(props.navigation.state);// { key: 'Home', routeName: 'Home' }
        console.log("Menu pressed");
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const onButtonPress = () => {
        const pushAction = StackActions.push({
            routeName: 'Stack1',
            params: {
                myUserId: 9,
            },
        });

        props.navigation.dispatch(pushAction);
    }

    const onLayout = (e) => {
        const layout = { x: e.nativeEvent.layout.x, y: e.nativeEvent.layout.y };
        layoutDimensions.contentOffset = layout.y;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onButtonPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View>
            <View onLayout={onLayout} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <FeatureButton navigation={props.navigation} style={styles.leftButton} halfSize={true} image={image1} />
                    <FeatureButton navigation={props.navigation} style={styles.rightButton} halfSize={true} image={image1} />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <FeatureButton navigation={props.navigation} style={styles.leftButton} halfSize={true} image={image2} />
                    <FeatureButton navigation={props.navigation} style={styles.rightButton} halfSize={true} image={image1} />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <FeatureButton navigation={props.navigation} style={styles.leftButton} halfSize={true} image={image1} />
                    <FeatureButton navigation={props.navigation} style={styles.rightButton} halfSize={true} image={image1} />

                </View>

                <FeatureButton navigation={props.navigation} halfSize={false} image={image1} />

            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }

const styles = StyleSheet.create({
    leftButton: {
    },
    rightButton: {
    }
})
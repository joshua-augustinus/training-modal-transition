import React, { useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { FeatureButton } from '@src/components/FeatureButton';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

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


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onButtonPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <FeatureButton navigation={props.navigation} style={styles.leftButton} />
                    <FeatureButton navigation={props.navigation} style={styles.rightButton} />

                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <FeatureButton navigation={props.navigation} style={styles.leftButton} />
                    <FeatureButton navigation={props.navigation} style={styles.rightButton} />

                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <FeatureButton navigation={props.navigation} style={styles.leftButton} />
                    <FeatureButton navigation={props.navigation} style={styles.rightButton} />

                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <FeatureButton navigation={props.navigation} style={styles.leftButton} />
                    <FeatureButton navigation={props.navigation} style={styles.rightButton} />

                </View>

            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }

const styles = StyleSheet.create({
    leftButton: {
        marginRight: 5
    },
    rightButton: {
        marginLeft: 5
    }
})
import { FeatureButton } from '@src/components/FeatureButton';
import { RootState } from '@src/types';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { useSelector } from 'react-redux'
/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}
export const FEATURE_BUTTON_HEIGHT = 150;

const ActivityScreen = (props: Props) => {
    const articleHeader = useSelector((state: RootState) => state.articleHeader)
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
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <View style={{ width: '100%', height: FEATURE_BUTTON_HEIGHT + 100 }}>
                    <Image style={{ ...styles.image, width: '100%', height: FEATURE_BUTTON_HEIGHT + 100 }} resizeMode='cover' source={articleHeader} />
                    <View style={styles.textContainer} ><Text style={{ color: 'white' }}>Text Text Text Text Text Text</Text>
                    </View>

                </View>

                <Text>Placeholder</Text>
            </View>
        </SafeAreaView>

    );

}

ActivityScreen.navigationOptions = {}

export { ActivityScreen }

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

    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        marginHorizontal: 20
    },
})
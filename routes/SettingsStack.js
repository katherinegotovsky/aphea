import { createStackNavigator } from 'react-navigation-stack';
import Settings from '../screens/settings';
import Header from '../shared/header';
import React from 'react';

const screens = {
    Settings: {
        screen: Settings,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Settings"/>,
            }
        }
    }
}

const SettingsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#feb7a1' }

    }
});

export default SettingsStack;
import { createStackNavigator } from 'react-navigation-stack';
import Calendar from '../screens/calendar';
import Header from '../shared/header';
import React from 'react';


const screens = {
    Calendar: {
        screen: Calendar,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Calendar"/>,
            }
        }
    },
}

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#feb7a1' }

    }
});

export default AboutStack;
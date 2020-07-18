import { createStackNavigator } from 'react-navigation-stack';
import CalendarPage from '../screens/calendar';
import Symptoms from '../screens/symptoms';
import Header from '../shared/header';
import React from 'react';


const screens = {
    Calendar: {
        screen: CalendarPage,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Calendar"/>,
            }
        }
    },
    Symptoms: {
        screen: Symptoms,
        navigationOptions: {
            title: 'Symptoms',
        }
    }
}

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#feb7a1' }

    }
});

export default AboutStack;
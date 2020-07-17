import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Symptoms from '../screens/symptoms';

const screens = {
    Home: {
        screen: Home
    },
    Symptoms: {
        screen: Symptoms
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './homeStack';
import AboutStack from './aboutStack';
import SettingsStack from './SettingsStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    Calendar: {
        screen: AboutStack,
    },
    Settings: {
        screen: SettingsStack,
    }
});

export default createAppContainer(RootDrawerNavigator);
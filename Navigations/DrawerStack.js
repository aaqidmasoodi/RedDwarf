import React from 'react'
import { Dimensions } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';



const windowWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: 'slide',
                swipeEdgeWidth: windowWidth
            }}
        >
            <Drawer.Screen
                name="Home"
                component={TabRoutes}
                options={{
                    headerShown: false
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack
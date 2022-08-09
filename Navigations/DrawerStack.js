import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import TabRoutes from './TabRoutes';


const DrawerStack = () => {
    return (
        <Drawer.Navigator>
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
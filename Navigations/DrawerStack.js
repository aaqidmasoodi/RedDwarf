import React from 'react'
import { Dimensions } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import Settings from '../screens/Settings';
import ScanQR from '../screens/ScanQR';
import CustomDrawer from '../screens/components/CustomDrawer';

import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();



const DrawerStack = () => {

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={({ route }) => ({
                drawerType: 'slide',
                swipeEdgeWidth: windowWidth,
                drawerLabelStyle: { marginLeft: -25, fontWeight: '700' },
                drawerActiveBackgroundColor: '#cf8300',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#6f6f6f',
                drawerIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings-sharp' : 'settings-outline';
                    } else if (route.name === 'ScanQR') {
                        iconName = focused ? 'scan-sharp' : 'scan-outline'
                    }

                    return <Ionicons name={iconName} size={28} color={color} />;
                }

            })}

        >
            <Drawer.Screen
                name="Home"
                component={TabRoutes}
                options={{
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="ScanQR"
                component={ScanQR}
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack
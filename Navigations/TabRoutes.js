import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import Dashboard from '../screens/Dashboard';
import Bus from '../screens/Bus';
import QRCode from '../screens/QRCode';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();



const TabRoutes = () => {
    return (
        <Tab.Navigator

            initialRouteName='Dashboard'

            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                    } else if (route.name === 'Bus') {
                        iconName = focused ? 'bus-sharp' : 'bus-outline';
                    } else if (route.name === 'QRCode') {
                        iconName = focused ? 'qr-code-sharp' : 'qr-code-outline'
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'card-sharp' : 'card-outline'
                    }


                    return <Ionicons name={iconName} size={28} color={color} />;
                },

                tabBarActiveTintColor: '#cf8300',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,

            })}
        >



            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Bus" component={Bus} />
            <Tab.Screen name="QRCode" component={QRCode} />
            <Tab.Screen name="Profile" component={Profile} />




        </Tab.Navigator>
    )
}

export default TabRoutes
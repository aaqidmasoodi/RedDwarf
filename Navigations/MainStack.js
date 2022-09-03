import React from 'react'
import Map from '../screens/Map';
import QR from '../screens/QR';
import SelectBus from '../screens/SelectBus';
import DrawerStack from './DrawerStack';
import BusChanged from '../screens/BusChanged';


const MainStack = (Stack) => {
    return (
        <>
            <Stack.Screen
                name='HomeRoute'
                component={DrawerStack}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='Map'
                component={Map}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='QR'
                component={QR}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='SelectBus'
                component={SelectBus}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='BusChanged'
                component={BusChanged}
                options={{
                    headerShown: false
                }}
            />



        </>
    )
}

export default MainStack
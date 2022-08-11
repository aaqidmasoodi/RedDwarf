import React from 'react'
import Map from '../screens/Map';
import QR from '../screens/QR';
import VerificationStatus from '../screens/VerificationStatus';

import DrawerStack from './DrawerStack';

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
                name='VerificationStatus'
                component={VerificationStatus}
                options={{
                    headerShown: false
                }}
            />

        </>
    )
}

export default MainStack
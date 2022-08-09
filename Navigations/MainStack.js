import React from 'react'
import Map from '../screens/Map';
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

        </>
    )
}

export default MainStack
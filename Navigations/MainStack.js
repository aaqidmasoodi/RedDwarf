import React from 'react'
import Map from '../screens/Map';
import TabRoutes from './TabRoutes';


const MainStack = (Stack) => {
    return (
        <>
            <Stack.Screen
                name='Home'
                component={TabRoutes}
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
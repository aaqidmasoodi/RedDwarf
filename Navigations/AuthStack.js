import React from 'react'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'



const AuthStack = (Stack) => {
    return (
        <>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={{
                    headerShown: false
                }}
            />

        </>
    )
}

export default AuthStack
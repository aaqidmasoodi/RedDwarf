import React from 'react'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import EnterOTP from '../screens/EnterOTP'


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

            <Stack.Screen
                name='EnterOTP'
                component={EnterOTP}
                options={{
                    headerShown: false
                }}
            />

        </>
    )
}

export default AuthStack
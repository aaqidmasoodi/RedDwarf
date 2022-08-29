import React from 'react'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import EnterOTP from '../screens/EnterOTP'
import OTPValidated from '../screens/OTPValidated'
import Register from '../screens/Register'
import AccountCreated from '../screens/AccountCreated'



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
                    gestureEnabled: false,
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='OTPValidated'
                component={OTPValidated}
                options={{
                    gestureEnabled: false,
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    gestureEnabled: false,
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='AccountCreated'
                component={AccountCreated}
                options={{
                    gestureEnabled: false,
                    headerShown: false
                }}
            />

        </>
    )
}

export default AuthStack
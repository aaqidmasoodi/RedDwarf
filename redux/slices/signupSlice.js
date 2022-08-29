import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    phoneNumber: null,
    name: null,
    password: null
}


export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setUserPhone: (state, action) => {
            state.phoneNumber = action.payload
        },

        setUserName: (state, action) => {
            state.name = action.payload
        },

        setUserPass: (state, action) => {
            state.password = action.payload
        }
    },
})


export const { setUserPhone, setUserName, setUserPass } = signUpSlice.actions


export default signUpSlice.reducer
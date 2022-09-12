import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    payments: null,
    loadingPayments: true
}

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setPayments: (state, action) => {
            state.payments = action.payload
        },

        setLoadingPayments: (state, action) => {
            state.loadingPayments = action.payload
        }

    }
})



export const { setPayments, setLoadingPayments } = paymentsSlice.actions

export default paymentsSlice.reducer
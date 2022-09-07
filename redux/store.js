import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/rootSlice'
import signUpReducer from './slices/signupSlice'
import busLocationReducer from './slices/busLocationSlice'

const store = configureStore({
  reducer: {
    root: rootReducer,
    signup: signUpReducer,
    busLocation: busLocationReducer
  }
})

export default store
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/rootSlice'
import signUpReducer from './slices/signupSlice'


const store = configureStore({
  reducer: {
    root: rootReducer,
    signup: signUpReducer
  }
})

export default store
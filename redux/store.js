import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './slices/rootSlice'
import signUpReducer from './slices/signupSlice'
import busLocationReducer from './slices/busLocationSlice'

const store = configureStore({
  reducer: {
    root: rootReducer,
    signup: signUpReducer,
    busLocation: busLocationReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export default store
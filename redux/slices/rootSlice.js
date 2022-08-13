import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },

    logout: (state) => {
      state.isLoggedIn = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = rootSlice.actions

// Selectors
export const selectIsLoggedIn = () => state.root.isLoggedIn;


export default rootSlice.reducer
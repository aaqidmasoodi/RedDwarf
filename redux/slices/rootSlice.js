import { createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store';


const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isLoggedIn: false
}

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoading = true;
      state.user = action.payload.user
      state.token = action.payload.token
      SecureStore.setItemAsync('token', state.token);
      state.isLoading = false;
    },

    logout: (state) => {
      state.isLoading = true;
      state.token = null;
      state.user = null;
      SecureStore.deleteItemAsync('token');
      state.isLoading = false;
    },


    setToken: (state, action) => {
      state.isLoading = true;
      state.token = action.payload
    },

    setUser: (state, action) => {
      state.isLoading = true;
      state.user = action.payload
      state.isLoading = false;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },

    setRefreshing: (state, action) => {
      state.refreshing = action.payload
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setToken, setUser, setIsLoading, setIsLoggedIn } = rootSlice.actions




export default rootSlice.reducer
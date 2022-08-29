import { createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store';

const initialState = {
  user: null,
  token: null,
  isLoading: true
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
      SecureStore.setItemAsync('user', JSON.stringify(state.user))
      state.isLoading = false;
    },

    logout: (state) => {
      state.isLoading = true;
      state.token = null;
      state.user = null;
      SecureStore.deleteItemAsync('token');
      SecureStore.deleteItemAsync('user');
      state.isLoading = false;
    },


    setToken: (state, action) => {
      state.token = action.payload
      state.isLoading = false;
    },

    setUser: (state, action) => {
      state.user = action.payload
      state.isLoading = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setToken, setUser } = rootSlice.actions




export default rootSlice.reducer
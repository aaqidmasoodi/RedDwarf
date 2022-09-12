import { createSlice } from '@reduxjs/toolkit'
import { LIVE_LOCATION_SOCKET_URL } from "../../api/config";

const initialState = {
    socket: null,
    busLocation: null,
    sharingLocation: false,
    receivingLocation: false
}



export const busLocationSlice = createSlice({
    name: 'busLocation',
    initialState,
    reducers: {
        setBusLocation: (state, action) => {
            payload = JSON.parse(action.payload);
            state.busLocation = payload.locations[0]
        },

        setSharingLocation: (state, action) => {
            state.sharingLocation = action.payload;
        },

        setReceivingLocation: (state, action) => {
            state.receivingLocation = action.payload;
        },


        connectSocket: (state) => {
            state.socket = null;
            const socket = new WebSocket(LIVE_LOCATION_SOCKET_URL);
            state.socket = socket;
        },

        closeSocket: (state) => {
            state.socket.close()
            state.socket = null;

        }
    }
})


export const { setBusLocation, setSharingLocation, setReceivingLocation, connectSocket, closeSocket } = busLocationSlice.actions

export default busLocationSlice.reducer
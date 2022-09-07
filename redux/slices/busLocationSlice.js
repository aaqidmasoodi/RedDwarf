import { createSlice } from '@reduxjs/toolkit'

// 
// const loc = {
//     "locations": [
//         {
//             "timestamp": 1662486606027,
//             "coords": {
//                 "altitude": 5,
//                 "heading": 180,
//                 "latitude": 37.4219983,
//                 "longitude": -122.084,
//                 "altitudeAccuracy": 0.5,
//                 "speed": 4.943388918523585e-18,
//                 "accuracy": 5
//             }
//         }
//     ]
// }

const initialState = {
    busLocation: null,
    sharingLocation: false,
    receivingLocation: false
}



export const busLocationSlice = createSlice({
    name: 'busLocation',
    initialState,
    reducers: {
        setBusLocation: (state, action) => {
            state.busLocation = JSON.parse(action.payload);
        },

        setSharingLocation: (state, action) => {
            state.sharingLocation = action.payload;
        },

        setReceivingLocation: (state, action) => {
            state.receivingLocation = action.payload;
        }
    }
})


export const { setBusLocation, setSharingLocation, setReceivingLocation } = busLocationSlice.actions

export default busLocationSlice.reducer
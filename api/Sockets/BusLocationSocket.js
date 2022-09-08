// this socket handles receiving and receiving of bus location 


import React from 'react'
import store from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux'
import { setReceivingLocation, setSharingLocation, setBusLocation } from '../../redux/slices/busLocationSlice';

import * as TaskManager from 'expo-task-manager';


const LOCATION_TRACKING = 'location-tracking';

const BusLocationSocket = ({ children }) => {

    let locationReceived = null;
    const liveLocationSocket = useSelector(state => state.busLocation.socket);
    const receivingLocation = useSelector(state => state.busLocation.receivingLocation);
    const user = useSelector(state => state.root.user);

    const dispatch = useDispatch();


    const handleReceivingLocation = ({ location }) => {
        dispatch(setBusLocation(location));
        if (!receivingLocation) {
            dispatch(setReceivingLocation(true));
            console.log("dispatched receiving.... true")
        }
        return setTimeout(() => {
            if (receivingLocation) {
                dispatch(setReceivingLocation(false));
                console.log("dispatched receiving.... false")
            }
        }, 5000);
    }

    if (liveLocationSocket) {

        // HANDSHAKE
        liveLocationSocket.onopen = () => {
            console.log("Connected to Socket as USER:", user?.name)
        };


        // RECEIVING
        liveLocationSocket.onmessage = (e) => {

            const location = e.data;

            console.log("Received a location...")
            if (!user?.is_driver) {
                locationReceived ? clearTimeout(locationReceived) : null;
                locationReceived = handleReceivingLocation({ location });
            } else {
                console.log("Current user is a driver. Doing Nothing...")
            }
        };


        // ERROR
        liveLocationSocket.onerror = (e) => {
            console.log(e.message);
        };


        // CLOSE
        liveLocationSocket.onclose = (e) => {
            console.log(e);
        };
    }
    else {
        console.log("Socket was Destroyed...")
    }


    return (
        <>
            {children}
        </>
    )
}

export default BusLocationSocket



TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
    if (data) {
        const state = store.getState();
        const liveLocationSocket = state.busLocation.socket;
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;

        console.log(
            `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
        );
        if (liveLocationSocket) {
            liveLocationSocket.send(JSON.stringify(data));
            console.log("Location Transmitted...")
        }
        else {
            console.log("Oops!! Socket was Destroyed.");
            TaskManager.unregisterTaskAsync(LOCATION_TRACKING);
            store.dispatch(setSharingLocation(false));
        }
    }
});
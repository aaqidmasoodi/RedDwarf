import store from "../../redux/store";
import { LIVE_LOCATION_SOCKET_URL } from "../config";
export const liveSocket = new WebSocket(LIVE_LOCATION_SOCKET_URL)
import { setReceivingLocation } from "../../redux/slices/busLocationSlice";

let timer = null;
const handleReceivingLocation = () => {
    const state = store.getState();
    store.dispatch(setReceivingLocation(true));
    console.log("dispatched receiving.... true")
    return setTimeout(() => {
        store.dispatch(setReceivingLocation(false));
        console.log("dispatched receiving.... false")
    }, 5000);
}

liveSocket.onopen = () => {
    console.log("Connected")
}


liveSocket.onmessage = (e) => {

    timer ? clearTimeout(timer) : null;
    console.log("Location Recieved... calling handler")
    timer = handleReceivingLocation();

};



liveSocket.onclose = () => {
    console.log("Closed")
}
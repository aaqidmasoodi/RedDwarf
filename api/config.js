import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:3000/api';
export const LIVE_LOCATION_SOCKET_URL = 'ws://10.0.2.2:3000/api/buses/live/'


// export const BASE_URL = 'https://cukbrs.herokuapp.com/api';
// export const LIVE_LOCATION_SOCKET_URL = 'http://cukbrs.herokuapp.com/api/buses/live/'


console.log("BASE_URL: ", BASE_URL)
console.log("LIVE_LOCATION_SOCKET_URL: ", LIVE_LOCATION_SOCKET_URL)

export default axios.create({
    baseURL: BASE_URL,
    timeout: 5000
})

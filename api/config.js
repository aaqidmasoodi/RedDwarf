import axios from 'axios';
// export const BASE_URL = 'http://10.0.2.2:3000/api';
export const BASE_URL = 'https://cukbrs.herokuapp.com/api';

export default axios.create({
    baseURL: BASE_URL,
    timeout: 50000
})



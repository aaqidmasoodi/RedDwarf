import axios from 'axios';
// const BASE_URL = 'http://10.0.2.2:3000/api';
const BASE_URL = 'https://cukbrs.herokuapp.com/api';

export default axios.create({
    baseURL: BASE_URL
})
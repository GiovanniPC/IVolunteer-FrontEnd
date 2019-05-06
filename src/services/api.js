import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
    // https://ivolunteer-rest-api.herokuapp.com
    baseURL: "http://127.0.0.1:5000"
});
api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
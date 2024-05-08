import axios from 'axios';
import Cookies from 'js-cookie';

const $api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api/v1', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json'
        // Add any other headers you need here
    }
});

$api.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = Cookies.get('token'); // Example: getting token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default $api;

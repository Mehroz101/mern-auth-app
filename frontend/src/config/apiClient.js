import axios from 'axios';

const options = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
};

const API = axios.create(options);

API.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API request error:', error);
        const { status, data } = error.response || {};
        return Promise.reject({ status, ...data });
    }
);

export default API;
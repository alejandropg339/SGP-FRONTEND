import axios, { AxiosRequestHeaders } from 'axios';

const ApiAuthClient = axios.create();

ApiAuthClient.interceptors.request.use(
    (config) => {
        config.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,

        } as AxiosRequestHeaders
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

ApiAuthClient.interceptors.response.use(
    (config) => {
        const { status } = config.data;
        if(!status || config.data.status === '1') {
            return config.data;
        } else {
            return Promise.reject(config.data);
        }
    }, (error) => {
        return Promise.reject(error);
    }
);

export default ApiAuthClient;